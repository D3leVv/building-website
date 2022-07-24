import { useEffect, useState } from "react";
import NewsCard from "../../components/News/NewsCard/NewsCard";
import { getMultipleDocsWithLimit } from "../../firebase/firebase-config";
import { News as NewsType } from "../../Types/News";

function News() {
    const [news, setNews] = useState<NewsType[]>();
    useEffect(() => {
        (async () => {
            try {
                const limitedNews = await getMultipleDocsWithLimit("news", 5);
                setNews(limitedNews);
            } catch (e: any) {
                setNews(e.message);
            }
        })();
    }, []);

    return (
        <div className="container px-6 mx-auto mt-12">
            {news && news.map((item, i) => <NewsCard {...item} key={i} />)}
        </div>
    );
}

export default News;
