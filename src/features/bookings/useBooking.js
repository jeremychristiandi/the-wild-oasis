import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"

export default function useBooking() {
    const { bookingId } = useParams()

    const {
        isLoading,
        data: booking,
        error
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false // retry to fetch the data 3x is disabled
    })

    return { isLoading, error, booking }
}