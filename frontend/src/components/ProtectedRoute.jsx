import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {
    const { userLoggedIn } = useAuth();

    // if user not logged in → redirect to login
    if (!userLoggedIn) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute;