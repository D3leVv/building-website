import NewsForm from "../../components/News/NewsForm";


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
                }}
            />
        </div>
    );
}

export default CreateNews;
