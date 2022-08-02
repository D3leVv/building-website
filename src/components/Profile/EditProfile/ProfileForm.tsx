import YupPassword from "yup-password";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../../../Types/User";
import useFileUpload from "../../hooks/useImageUpload";
import ProgressBar from "../../Helper/ProgressBar/ProgressBar";
import DeleteImageButton from "../../Helper/Buttons/DeleteImageButton";
import { deletePicture } from "../../../firebase/firebase-config";
import useImageFromStorage from "../../hooks/useImageFromStorage";
import TextInputField from "../../Helper/ImputFields/TextInputField";
YupPassword(yup);

const schema = yup.object({
    email: yup.string().required("Email is Required").email(),
    firstName: yup.string().required().min(3).max(20),
    lastName: yup.string().required().min(3).max(20),
});

const inputFields: any[] = [
    {
        name: "firstName",
        id: "firstName",
        placeholder: "First name",
        type: "string",
        // autoComplete: "email",
    },
    {
        name: "lastName",
        id: "lastName",
        placeholder: "Last name",
        type: "string",
        // autoComplete: "email",
    },
    {
        name: "email",
        id: "email",
        placeholder: "Email address",
        type: "email",
        autoComplete: "email",
    },
];

const ProfileForm = ({
    userData,
    docID,
    updateUserData,
}: {
    userData: User;
    docID: string;
    updateUserData: (val: User) => Promise<void>;
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({
        defaultValues: userData,
        resolver: yupResolver(schema),
    });
    const [formSubmitError, setFormSubmitError] = useState<null | string>(null);
    const [img, setImg] = useState<File | null>(null);
    const { url, error, progress, setUrl } = useFileUpload(
        img,
        "users-profile-pictures"
    );

    const { currUrl, setCurrUrl } = useImageFromStorage(
        "users-profile-pictures",
        userData.image.alt
    );
    const onSubmit = async (data: User) => {
        let payload = data;
        if (url) payload.image = url;

        try {
            console.log(url);
            const data = await updateUserData(payload);
            console.log(data);
        } catch (error: any) {
            setFormSubmitError(error.message);
        }
    };
    console.log(
        "person2.JPEG80e12339-9eaf-4ea3-b070-d4bbb5e6e289" ===
            "person2.JPEG80e12339-9eaf-4ea3-b070-d4bbb5e6e289"
    );

    const handlePictureDelete = async () => {
        if (currUrl || currUrl) {
            deletePicture(currUrl.url, currUrl.alt);
            setUrl(null);
            setCurrUrl(null);
            let payload = userData;
            payload.image = { url: "", alt: "" };
            console.log(payload);
            await updateUserData(payload);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            {formSubmitError ? (
                <h1 className="text-3xl text-red">{formSubmitError}</h1>
            ) : (
                <div className="flex flex-col gap-3 p-3 -space-y-px rounded-lg shadow-md dark:shadow-white dark:border dark:border-gray-200 ">
                    {inputFields.map((field, i) => (
                        <Controller
                            key={i}
                            control={control}
                            name={field.name}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextInputField
                                    autoComplete={field.autoComplete}
                                    id={field.id}
                                    label={field.placeholder}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    error={error}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    ))}{" "}
                    {!userData.image.url ? (
                        <>
                            {!url && (
                                <div>
                                    <label htmlFor="picture">
                                        <p className="text-gray-500">
                                            Upload profile picture
                                        </p>
                                        {errors.image && (
                                            <p className="text-red-500">
                                                {errors.image.message}
                                            </p>
                                        )}
                                    </label>
                                    <input
                                        id="picture"
                                        type="file"
                                        onChange={(e: any) =>
                                            setImg(e.target.files[0])
                                        }
                                        accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                        className={`${
                                            errors.image &&
                                            "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                                        }relative mt-1 dark:bg-black dark:text-white block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:z-10 sm:text-sm`}
                                        placeholder="Profile image"
                                    />
                                </div>
                            )}
                            {url && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="flex items-center justify-between"
                                >
                                    <img
                                        src={url?.url}
                                        className="object-contain w-full h-16"
                                        alt={url?.alt}
                                    />
                                    <p>{url?.alt}</p>
                                    <DeleteImageButton
                                        onClick={handlePictureDelete}
                                    />
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex items-center justify-between"
                        >
                            <img
                                src={userData.image.url}
                                className="object-contain w-full h-16"
                                alt={userData.image.alt}
                            />
                            <p>{userData.image.alt}</p>
                            <DeleteImageButton onClick={handlePictureDelete} />
                        </motion.div>
                    )}
                    {progress > 0 && progress < 100 && (
                        <div>
                            <ProgressBar progress={progress} />
                        </div>
                    )}
                </div>
            )}

            <div>
                <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium bg-yellow-300 border border-transparent rounded-md shadow-lg dark:text-white dark:bg-yellow-500 hover:bg-yellow-400 group dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
                >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon
                            className="w-5 h-5 text-yellow-700 dark:text-yellow-300 dark:group-hover:text-yellow-100"
                            aria-hidden="true"
                        />
                    </span>
                    Update
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
