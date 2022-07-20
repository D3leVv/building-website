import { useState } from "react";
import { useForm } from "react-hook-form";

type Data = {
    title: string;
    description: string;
    image: {
        url: string;
        alt: string;
    };
};

function NewsForm({ data }: { data: Data }) {
    const [image, setImage] = useState<File | null>(null);
    // const []
    const { register, handleSubmit } = useForm<Data>({ defaultValues: data });
    const onSubmit = async (data: Data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e: any) => console.log(e.target.files[0])}
            />
            {image && <img src="" />}
        </form>
    );
}

export default NewsForm;
