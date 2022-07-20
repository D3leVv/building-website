import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../components/context/UserContext/UserProvider";

function ProtectedRoutes({ user }: { user: any }) {
    const location = useLocation();
    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

export default ProtectedRoutes;
