import { useState } from "react";
import { bookSlot } from "../api/slotsApi";

export const useBooking = () => {
    const [loading, setLoading] = useState(false);
    const [bookingFailed, setBookingFailed] = useState(false);

    const bookAppointment = async (slotId: number, name: string) => {
        setLoading(true);
        setBookingFailed(false);
        try {
            await bookSlot(slotId, name);
            setBookingFailed(false);
            return true;
        } catch {
            setBookingFailed(true);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { loading, bookingFailed, bookAppointment }
}