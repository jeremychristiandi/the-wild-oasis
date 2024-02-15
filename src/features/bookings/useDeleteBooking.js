import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings"

import { toast } from "react-hot-toast"

function useDeleteBooking() {
    const queryClient = useQueryClient()

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Booking has been deleted!")
            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return { isDeleting, deleteBooking }
}

export default useDeleteBooking