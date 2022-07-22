import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({ user }: { user: any }) {
    const location = useLocation();
    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

export default ProtectedRoutes;
