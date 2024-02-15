import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import { toast } from "react-hot-toast"

function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: user => {
            queryClient.setQueriesData(["user"], user)
            navigate("/dashboard")
        },
        onError: error => {
            toast.error("Provided credentials is not valid")
        }
    })

    return { login, isLoading }
}

export default useLogin