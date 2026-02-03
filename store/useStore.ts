import { create } from "zustand";
import { persist } from "zustand/middleware"; 
import { Car, FiltersParams } from "@/types/cars";
import { fetchCars } from "@/lib/api/request";

interface StoreState {
    cars: Car[],
    favorites: Car[],
    isLoading: boolean,
    page: number,
    filters: FiltersParams,
    setLoading: (loading: boolean) => void,
    searchCars: (params: FiltersParams) => Promise<void>,
    loadMore: () => Promise<void>,
    toggleFavorite: (car: Car) => void,
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            cars: [],
            favorites: [],
            isLoading: false,
            page: 1,
            filters: {},
            setLoading: (loading) => set({ isLoading: loading }),
            searchCars: async (params) => {
                set({ isLoading: true });
                try {
                    const currentPage = 1;
                    
                    const data = await fetchCars({ ...params, page: currentPage.toString() });
                    console.log("API Response:", data);
                        set({
                            cars: data.cars,
                            page: currentPage,
                            filters: params,
                        });
                }
                catch (error) {
                    console.error("Error:", error);
                }
                finally {
                    set({ isLoading: false });
                }
            },
            loadMore: async () => {
                const { page, filters, cars } = get();
                const nextPage = page + 1;
                set({ isLoading: true });
                try {
                    const newCars = await fetchCars({ ...filters, page: nextPage.toString() });
                        set({
                            cars: [...cars, ...newCars.cars],
                            page: nextPage,
                        });
                }
                catch (error) {
                    console.error("Error:", error);
                }
                finally {
                    set({ isLoading: false });
                }
            },
            toggleFavorite: (car) => {
                const { favorites } = get();
                const isExist = favorites.some((fav) => fav.id === car.id);
                if (isExist) {
                    set({ favorites: favorites.filter((fav) => fav.id !== car.id) })
                }
                else {
                    set({ favorites: [...favorites, car] })
                }
            },
        }),
        {
            name: "rental-car-storage", 
            partialize: (state) => ({ favorites: state.favorites }), 
        }
    )
);