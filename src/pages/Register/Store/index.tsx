import { useContext } from "react";
import { ShipContext } from "../../../components/context/ShipContext/ShipProvider";
import ShipCard from "../../../components/Ship/ShipCard";

function Store() {
    const { ships } = useContext(ShipContext);
    return (
        <div className="container px-6 mx-auto mt-12">
            {ships && ships.map((item, i) => <ShipCard {...item} key={i} />)}
        </div>
    );
}

export default Store;
