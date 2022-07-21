import NewsForm from "../../components/News/Create/NewsForm";

function CreateNews() {
    return (
        <div className="container flex flex-col max-w-3xl gap-12 px-6 mx-auto">
            <h1 className="mt-12 text-3xl font-bold">Create News</h1>
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
