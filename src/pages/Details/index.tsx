import { useState, useContext, useEffect } from "react";
import { ShipContext } from "../../components/context/ShipContext/ShipProvider";
import { useParams } from "react-router-dom";
import { Ship } from "../../Types/Ships";

function DetailsPage() {
    const [ship, setShip] = useState<Ship | null>(null);
    const [loading, setLoading] = useState(false);
    const { getSingleShipWithId } = useContext(ShipContext);
    const { shipID } = useParams();

    useEffect(() => {
        setLoading(true);
        if (shipID) {
            (async () => {
                try {
                    const data = await getSingleShipWithId(shipID);
                    if (data) {
                        setShip(data);
                        setLoading(false);
                    }
                } catch (e) {
                    console.log(e);
                    setLoading(false);
                }
            })();
        }
    }, [shipID]);

    return (
        ship && (
            <div className="container flex flex-col w-full h-full gap-3 px-6 mx-auto">
                <img
                    src={ship?.image}
                    alt={ship.title}
                    className="object-contain w-full h-52"
                />

                <p className="text-3xl font-bold">
                    <span> {ship.title}</span>
                </p>

                <p className="text-3xl font-bold">
                    Description
                    <span className="block text-sm">{ship.description}</span>
                </p>
                <p className="text-3xl font-bold">Const: {ship.price}$</p>
            </div>
        )
    );
}

export default DetailsPage;
