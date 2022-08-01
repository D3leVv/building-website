import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import { getDocumentsWithWhere } from "../../firebase/firebase-config";
import { News } from "../../Types/News";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShipCard from "../../components/Ship/ShipCard";

function MyNews() {
    const [myShip, setMyShip] = useState<News[]>([]);
    const { userData } = useContext<any>(UserContext);
    useEffect(() => {
        if (!userData) return;
        (async () => {
            let allShips: News[] = [];
            const ships = await getDocumentsWithWhere(
                "news",
                [
                    {
                        field: "author",
                        operator: "==",
                        searchValue: userData.firstName,
                    },
                ],
                10
            );
            ships?.forEach((item) => allShips.push(item.data() as News));
            setMyShip(allShips);
        })();
    }, []);

    return (
        <div className="container flex flex-col items-center gap-6 px-6 mx-auto mt-12 md:grid md:grid-cols-2 lg:grid-cols-3">
            <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col w-full h-full items-center justify-center max-w-sm overflow-hidden rounded-lg shadow-lg cursor-pointer min-h-[400px]"
            >
                <Link
                    to="/ship/create"
                    className="flex items-center justify-center w-full h-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </Link>
            </motion.div>
            {myShip && myShip.map((item, i) => <ShipCard key={i} {...item} />)}
        </div>
    );
}

export default MyNews;
