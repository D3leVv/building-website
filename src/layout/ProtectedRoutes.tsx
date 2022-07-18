import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext/UserProvider";

function ProtectedRoutes() {
    const { user } = useContext<any>(UserContext);
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
