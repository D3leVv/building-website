import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { ShipContext } from "../components/context/ShipContext/ShipProvider";

function DetailsPageGuard() {
    const { ships } = useContext(ShipContext);
    const { shipID } = useParams();
    return ships.some((x) => x.docID === shipID) ? (
        <Outlet />
    ) : (
        <Navigate to="/asdjahsdkajshd" />
    );
}

export default DetailsPageGuard;
