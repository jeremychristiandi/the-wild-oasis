import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    // Filter
    const filterValue = searchParams.get("status")
    const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

    // Sort
    let sortBy = searchParams.get("sortBy") || "startDate-asc"
    const [field, direction] = sortBy.split("-")
    sortBy = { field, direction }

    // Pagination
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    const {
        isLoading,
        data: { data: bookings, count } = {},
        error
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page], // react query will re-fetch when filter/sortBy changes
        queryFn: () => getBookings({ filter, sortBy, page })
    })

    // PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE)
    page < pageCount && queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page + 1],
        queryFn: () => getBookings({
            filter, sortBy, page: page + 1
        })
    })
    page > 1 && queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page - 1],
        queryFn: () => getBookings({
            filter, sortBy, page: page - 1
        })
    })

    return { isLoading, error, bookings, count }
}