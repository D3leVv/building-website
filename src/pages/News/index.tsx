import React from "react";
import { getMultipleDocsWithLimit } from "../../firebase/firebase-config";

function News() {
    getMultipleDocsWithLimit("news", 5);

    return <div>News</div>;
}

export default News;
