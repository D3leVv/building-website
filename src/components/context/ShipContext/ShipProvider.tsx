import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { writeSingleShipDocument } from "../../../firebase/firebase-config";
import { Ship } from "../../../Types/Ships";

type ContextType = {
    createShip: (payload: Ship) => Promise<void>;
};

export const ShipContext = createContext({} as ContextType);

function ShipProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [ship, setShip] = useState("");

    const createShip = async (payload: Ship) => {
        const docID = v4();
        const response = await writeSingleShipDocument("ships", payload, docID);
        if (response === "success") {
            return navigate("/store");
        }
    };

    return (
        <ShipContext.Provider value={{ createShip }}>
            {children}
        </ShipContext.Provider>
    );
}

export default ShipProvider;
