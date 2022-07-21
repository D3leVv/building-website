import NewsForm from "../../components/News/Create/NewsForm";

function CreateNews() {
    return (
        <div>
            <NewsForm
                data={{
                    description: "",
                    title: "",
                    image: {
                        url: "",
                        alt: "",
                    },
                    type: "news",
                    author: "",
                }}
            />
        </div>
    );
}

export default CreateNews;
