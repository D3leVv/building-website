import { useEffect, useState } from "react";
import ShipCard from "../../components/Ship/ShipCard";
import { getMultipleDocsWithLimit } from "../../firebase/firebase-config";
import { News as NewsType } from "../../Types/News";

function Store() {
    const [ships, setShips] = useState<NewsType[]>();
    useEffect(() => {
        (async () => {
            try {
                const limitedNews = await getMultipleDocsWithLimit("ships", 5);
                setShips(limitedNews);
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
