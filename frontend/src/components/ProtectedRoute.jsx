import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
    const { userLoggedIn } = useAuth();
}

export default ProtectedRoute;