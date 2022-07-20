import React from "react";
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
    const { register, handleSubmit } = useForm<Data>({ defaultValues: data });
    const onSubmit = async (data: Data) => {
        console.log(data);
    };

    return <div>NewsForm</div>;
}

export default NewsForm;
