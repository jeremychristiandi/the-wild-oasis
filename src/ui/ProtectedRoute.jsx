import useUser from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

function ProtectedRoute({ children }) {
    // 1. Load the authenticated user
    const { isLoading, isAuthenticated } = useUser()
    const navigate = useNavigate()

    // 2. If the user is not authenticated, redirect to /login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login")
    }, [isAuthenticated, isLoading, navigate])

    // 3. While loading, show a loading spinner
    if (isLoading) return (
        <FullPage>
            <Spinner />
        </FullPage>
    )

    // 4. If there is a user, then render the children
    if (isAuthenticated) return children
}

export default ProtectedRoute