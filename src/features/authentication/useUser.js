import { getCurrentUser } from "../../services/apiAuth"
import { useQuery } from "@tanstack/react-query"

function useUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser
    })
    const isAuthenticated = user?.role === "authenticated"

    return { isLoading, user, isAuthenticated }
}

export default useUser