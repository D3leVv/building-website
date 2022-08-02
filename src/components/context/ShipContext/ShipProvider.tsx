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
    getSingleDocWithDocId,
    writeSingleShipDocument,
} from "../../../firebase/firebase-config";
import { Ship } from "../../../Types/Ships";

type ContextType = {
    createShip: (payload: Ship) => Promise<void>;
    ships: Ship[];
    getSingleShipWithId: (docID: string) => Promise<Ship | undefined>;
};

export const ShipContext = createContext({} as ContextType);

function ShipProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    // const [ship, setShip] = useState<Ship | null>(null);
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

    const getSingleShipWithId = useCallback(async (docID: string) => {
        try {
            return (await getSingleDocWithDocId("ships", docID)) as Ship;
        } catch (e: any) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getShipsWithLimit();
    }, []);

    return (
        <ShipContext.Provider
            value={{ createShip, ships, getSingleShipWithId }}
        >
            {children}
        </ShipContext.Provider>
    );
}

export default ShipProvider;
