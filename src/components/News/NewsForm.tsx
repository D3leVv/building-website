import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Data = {
    title: string;
    description: string;
    image: File | null;
};

const schema = yup.object({
    title: yup.string().required().min(3).max(20),
    description: yup.string().required().min(10).max(3000),
    file: yup.mixed().required("File is required"),
});

function NewsForm({ data }: { data: Data }) {
    const [image, setImage] = useState<File | null>(null);
    const [imageView, setImageView] = useState<string | null>();
    // const []
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data>({
        defaultValues: data,
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: Data) => {
        console.log(data);
    };

    const handleImage = useCallback(
        (e: any) => {
            if (!e.target.files && !e.target.files[0]) return;
            let reader = new FileReader();
            reader.onload = (e: any) => {
                setImageView(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        },
        [imageView, setImageView]
    );

    return (
        <form
            className="container flex flex-col items-center w-full h-full gap-6 p-6 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
        >
            <label className="w-full">
                <p className="w-full  mb-1.5">News Title</p>

                <input
                    className={`w-full rounded-xl dark:bg-black dark:text-white focus:ring-yellow-200 s focus:border-yellow-200 ${
                        errors.title &&
                        "border-red-600 focus:border-red-600 focus:ring-red-600"
                    }`}
                    type="text"
                    {...register("title")}
                />
                <p className="w-full text-red-600 mt-1.5">
                    {errors.title?.message}
                </p>
            </label>
            <label
                // ref={labelRef}
                className="w-full rounded-md border-[3px] relative border-borderColor border-dashed hover:border-gray"
            >
                <input
                    {...register("image")}
                    type="file"
                    onChange={handleImage}
                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                    // hidden
                    className="w-full h-[200px] cursor-pointer opacity-0 dark:bg-black dark:text-white "
                />
                <p className="z-10 dark:text-white cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-center  text-3xl ">
                    Upload image
                </p>
            </label>
            {imageView && <img src={imageView} width={400} />}
            <button
                className="p-3 border border-gray-500 rounded-xl dark:hover:bg-gray-800 hover:bg-gray-200"
                type="submit"
            >
                submit
            </button>
        </form>
    );
}

export default NewsForm;
