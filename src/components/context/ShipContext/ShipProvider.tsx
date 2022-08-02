import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { writeSingleDocument } from "../../../firebase/firebase-config";
import { Ship } from "../../../Types/Ships";

type ContextType = {
    createShip: (payload: Ship) => Promise<void>;
};

export const ShipContext = createContext({} as ContextType);

function ShipProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [ship, setShip] = useState("");

    const createShip = async (payload: Ship) => {
        const response = await writeSingleDocument("ships", payload);
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
