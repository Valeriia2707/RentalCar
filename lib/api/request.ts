import { FiltersParams, Car, CarsResponse } from "@/types/cars";
import { api } from "./api";

export async function fetchCars(params: FiltersParams = {}): Promise<CarsResponse> {
    const {
        page = '1',
        limit = '12',
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
    } = params;

    const res = await api.get<CarsResponse>("/cars", {
        params: {
            page,
            limit,
            brand: brand || undefined,
            rentalPrice: rentalPrice || undefined,
            minMileage: minMileage || undefined,
            maxMileage: maxMileage || undefined,
        }
    });
    return res.data;
}

export async function fetchCarById(id:string): Promise<Car> {
    const res = await api.get<Car>(`/cars/${id}`);
    return res.data;
}

export async function fetchBrands(): Promise<string[]> {
    const res = await api.get<string[]>("/brands");
    return res.data;
}
