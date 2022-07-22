import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFileUpload from "../../hooks/useImageUpload";
import { useNavigate } from "react-router-dom";

import {
    deletePicture,
    writeSingleDocument,
} from "../../../firebase/firebase-config";
import MDEditor from "@uiw/react-md-editor";
import NewsContentType from "./NewsContentType";
import ProgressBar from "../../Helper/ProgressBar/ProgressBar";
import DeleteImageButton from "../../Helper/Buttons/DeleteImageButton";
import { UserContext } from "../../context/UserContext/UserProvider";

type Data = {
    title: string;
    description: string;
    image: {
        url: string;
        alt: string;
    };
    type: string;
    author: string;
};

const schema = yup.object({
    title: yup.string().required().min(3).max(20),
    description: yup.string().required().min(10).max(3000),
    type: yup.string().required().min(3).max(20),
});

function NewsForm({ data }: { data: Data }) {
    const [image, setImage] = useState<File | null>(null);
    const { userData } = useContext(UserContext);
    const [submitError, setSubmitError] = useState<Error | null>(null);
    const navigate = useNavigate();
    const { url, progress, setUrl, error } = useFileUpload(
        image,
        "news-images"
    );

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Data>({
        defaultValues: data,
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: Data) => {
        let payload = data;
        if (url) payload["image"] = url;
        if (userData) payload["author"] = userData.firstName;
        try {
            const response = await writeSingleDocument("news", payload);
            if (response === "success") {
                navigate("/news");
            }
        } catch (e: any) {
            console.log(e);
            setSubmitError(e);
        }
    };

    const handlePictureDelete = () => {
        if (url) deletePicture(url.url, url.alt);
        return setUrl(null);
    };
    return (
        <form
            className="flex flex-col w-full h-full gap-6 "
            onSubmit={handleSubmit(onSubmit)}
        >
            {" "}
            {submitError ? (
                <p className="text-3xl">
                    Something went wrong! Please refresh the page and try again!
                </p>
            ) : (
                <>
                    {/* title */}
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
                    <label className="w-full">
                        <p className="w-full  mb-1.5">News Author</p>

                        <input
                            className={`w-full rounded-xl dark:bg-black dark:text-white focus:ring-yellow-200 s focus:border-yellow-200 ${
                                errors.author &&
                                "border-red-600 focus:border-red-600 focus:ring-red-600"
                            }`}
                            type="text"
                            {...register("author")}
                        />
                        <p className="w-full text-red-600 mt-1.5">
                            {errors.author?.message}
                        </p>
                    </label>
                    {/* MDEditor descpription */}
                    <label className=" md:col-span-2 text-gray">
                        <p className="block mb-3 text-gray">Description</p>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <MDEditor
                                    value={value}
                                    onChange={onChange}
                                    height={500}
                                />
                            )}
                        />
                        <p className="w-full text-red-600 mt-1.5">
                            {errors.description?.message}
                        </p>
                    </label>
                    <div className="flex w-full ">
                        <Controller
                            name="type"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <NewsContentType
                                    value={value}
                                    onChange={onChange}
                                    label="News type"
                                />
                            )}
                        />
                    </div>
                    {/* input for adding image */}
                    <label className="w-full rounded-md border-[3px] relative border-borderColor border-dashed hover:border-gray">
                        <input
                            type="file"
                            onChange={(e: any) => {
                                setImage(e.target.files[0]);
                            }}
                            accept="image/x-png,image/gif,image/jpeg,image/jpg"
                            className="w-full h-[200px] cursor-pointer opacity-0 dark:bg-black dark:text-white "
                        />
                        <p className="z-10 dark:text-white cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-center  text-3xl ">
                            Upload image
                        </p>
                    </label>
                    {/* show progress of image uploading */}
                    {progress > 0 && progress < 100 && (
                        <ProgressBar progress={progress} />
                    )}
                    {/* show image and delete button */}
                    {url && (
                        <div className="flex flex-col items-center justify-between w-full p-6 border border-gray-500 rounded-xl md:flex-row">
                            <img src={url.url} width={200} />
                            <p>{url.alt}</p>
                            <DeleteImageButton onClick={handlePictureDelete} />
                        </div>
                    )}
                    {error && <p className="text-red-500">{error.message}</p>}
                    <div className="flex items-center justify-center w-full">
                        <button
                            className="w-32 p-3 border border-gray-500 rounded-xl dark:hover:bg-gray-800 hover:bg-gray-200"
                            type="submit"
                        >
                            submit
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}

export default NewsForm;
