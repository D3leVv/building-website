import { useEffect, useState } from "react";
import ShipCard from "../../components/Ship/ShipCard";
import { getMultipleDocsWithLimit } from "../../firebase/firebase-config";
import { Ship as ShipType } from "../../Types/Ships";

function Store() {
    const [ships, setShips] = useState<ShipType[]>();
    useEffect(() => {
        (async () => {
            try {
                const limitedShip = await getMultipleDocsWithLimit("ships", 5);
                setShips(limitedShip);
            } catch (e: any) {
                setShips(e.message);
            }
        })();
    }, []);

    return (
        <div className="container px-6 mx-auto mt-12">
            {ships && ships.map((item, i) => <ShipCard {...item} key={i} />)}
        </div>
    );
}

export default Store;
