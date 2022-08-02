import {
    createContext,
    useState,
    ReactNode,
    useCallback,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import {
    getMultipleDocsWithLimit,
    writeSingleShipDocument,
} from "../../../firebase/firebase-config";
import { Ship } from "../../../Types/Ships";

type ContextType = {
    createShip: (payload: Ship) => Promise<void>;
    getShipsWithLimit: () => Promise<void>;
    ships: Ship[];
};

export const ShipContext = createContext({} as ContextType);

function ShipProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [ship, setShip] = useState("");
    const [ships, setShips] = useState<Ship[]>([]);

    const createShip = async (payload: Ship) => {
        const docID = v4();
        payload.docID = docID;
        const response = await writeSingleShipDocument("ships", payload, docID);
        if (response === "success") {
            return navigate("/store");
        }
    };

    const getShipsWithLimit = useCallback(async () => {
        try {
            const limitedShip: Ship[] = await getMultipleDocsWithLimit(
                "ships",
                5
            );
            setShips(limitedShip);
        } catch (e: any) {
            setShips(e.message);
        }
    }, []);

    useEffect(() => {
        getShipsWithLimit();
    }, []);

    return (
        <ShipContext.Provider value={{ createShip, getShipsWithLimit, ships }}>
            {children}
        </ShipContext.Provider>
    );
}

export default ShipProvider;
