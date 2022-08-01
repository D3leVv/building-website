import {
    useContext,
    createContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { writeSingleDocument } from "../../../firebase/firebase-config";
import { News } from "../../../Types/News";

type ContextType = {
    createNews: (payload: News) => Promise<void>;
};

export const NewsContext = createContext<ContextType | null>(null);

function NewsProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [news, setNews] = useState("");

    const createNews = async (payload: News) => {
        const response = await writeSingleDocument("news", payload);
        if (response === "success") {
            return navigate("/news");
        }
    };

    return (
        <NewsContext.Provider value={{ createNews }}>
            {children}
        </NewsContext.Provider>
    );
}

export default NewsProvider;
