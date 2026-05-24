import { Outlet } from "react-router-dom";

function AuthLayout({ children }) {
    return (
        <div className="auth-shell">
            <Outlet />
        </div>
    )
}

export default AuthLayout;