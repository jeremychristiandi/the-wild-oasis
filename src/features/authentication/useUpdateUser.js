import { useQueryClient, useMutation } from "@tanstack/react-query"
import { updateCurrentUser } from "../../services/apiAuth"
import { toast } from "react-hot-toast"

export function useUpdateUser() {
    const queryClient = useQueryClient()

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            queryClient.setQueryData(["user"], user)
            // queryClient.invalidateQueries({
            //     queryKey: ["user"]
            // })
            toast.success("User account has been updated")
        },
        onError: error => toast.error(error.message)
    })

    return { updateUser, isUpdating }
}