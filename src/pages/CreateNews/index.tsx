import NewsForm from "../../components/News/NewsForm";

function CreateNews() {
    return (
        <div>
            <NewsForm
                data={{
                    description: "",
                    title: "",
                    image: null,
                    type: "news",
                }}
            />
        </div>
    );
}

export default CreateNews;
