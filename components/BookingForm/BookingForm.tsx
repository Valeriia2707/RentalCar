import css from "./BookingForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef, MouseEventHandler } from "react";

interface CustomInputProps {
  value?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  placeholder?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, className, placeholder }, ref) => (
    <div className={css.datePickerContainer} onClick={onClick}>
      <input
        value={value}
        className={className}
        placeholder={placeholder || "Booking date"}
        readOnly
        ref={ref}
      />
    </div>
  ),
);

CustomInput.displayName = "CustomInput";

export default function BookingForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className={css.formWrapper}>
      <div className={css.formHeader}>
        <h3 className={css.formTitle}>Book your car now</h3>
        <p className={css.formSubtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <form className={css.form} onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Name*" className={css.input} required />
        <input
          type="email"
          placeholder="Email*"
          className={css.input}
          required
        />
        <div className={css.datePickerWrapper}>
          <DatePicker
            calendarStartDay={1}
            formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
            customInput={<CustomInput className={css.input} />}
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Booking date"
            className={css.input}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>
        <textarea placeholder="Comment" className={css.textarea}></textarea>
        <button type="submit" className={css.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
}
