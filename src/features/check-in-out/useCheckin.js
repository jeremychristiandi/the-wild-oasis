import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import { useNavigate } from "react-router-dom"

import { toast } from "react-hot-toast"

export default function useCheckin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`)
            queryClient.invalidateQueries({ active: true })
            navigate("/bookings/")
        },
        onError: () => {
            toast.error("Error occured while checkin in")
        }
    })

    return { checkin, isCheckingIn }
}