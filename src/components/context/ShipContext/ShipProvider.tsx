import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { writeSingleDocument } from "../../../firebase/firebase-config";
import { News } from "../../../Types/News";

type ContextType = {
    createShip: (payload: News) => Promise<void>;
};

export const ShipContext = createContext({} as ContextType);

function NewsProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [ship, setShip] = useState("");

    const createShip = async (payload: News) => {
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

export default NewsProvider;
