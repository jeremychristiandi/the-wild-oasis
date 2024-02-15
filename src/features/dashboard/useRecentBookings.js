import { useSearchParams } from "react-router-dom"
import { subDays } from "date-fns"
import { getBookingsAfterDate } from "../../services/apiBookings"
import { useQuery } from "@tanstack/react-query"

function useRecentBookings() {
    const [searchParams] = useSearchParams()

    const numOfDays = searchParams.get("last") ? Number(searchParams.get("last")) : 7
    const queryDate = subDays(new Date(), numOfDays).toISOString()

    const {
        isLoading,
        data: bookings
    } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${numOfDays}`]
    })

    return { isLoading, bookings }
}

export default useRecentBookings