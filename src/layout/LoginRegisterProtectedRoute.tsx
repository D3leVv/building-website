import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../components/context/UserContext/UserProvider";

function LoginRegisterProtectedRoute() {
    const { user } = useContext(UserContext);
    const location = useLocation();
    return !user ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
}

export default LoginRegisterProtectedRoute;
