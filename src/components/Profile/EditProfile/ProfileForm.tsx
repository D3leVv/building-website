import YupPassword from "yup-password";
import { useState, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
YupPassword(yup);

type Profile = {
    firstName: string;
    lastName: string;
    email: string;
    image: {
        url: string;
        alt: string;
    };
};

const schema = yup.object({
    email: yup.string().required("Email is Required").email(),
    firstName: yup.string().required().min(3).max(20),
    lastName: yup.string().required().min(3).max(20),
});

const ProfileForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Profile>({ resolver: yupResolver(schema) });
    const [formSubmitError, setFormSubmitError] = useState<null | string>(null);

    const onSubmit = async (data: Profile) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            {formSubmitError ? (
                <h1 className="text-3xl text-red">{formSubmitError}</h1>
            ) : (
                <div className="flex flex-col gap-3 -space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="first-name">
                            <p className="text-gray-500">First name</p>
                            {errors.firstName && (
                                <p className="text-red-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </label>
                        <input
                            {...register("firstName")}
                            id="firstName"
                            type="string"
                            className={`${
                                errors.firstName &&
                                "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500 ring-red-500"
                            }relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="First name"
                        />
                    </div>
                    <div>
                        <label htmlFor="last-name">
                            <p className="text-gray-500">Last name</p>
                            {errors.lastName && (
                                <p className="text-red-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </label>
                        <input
                            {...register("lastName")}
                            id="last-name"
                            type="string"
                            className={`${
                                errors.lastName &&
                                "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                            }relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Last name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address">
                            <p className="text-gray-500">Email address</p>
                            {errors.email && (
                                <p className="text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </label>
                        <input
                            {...register("email")}
                            id="email-address"
                            type="email"
                            autoComplete="email"
                            className={`${
                                errors.email &&
                                "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                            }relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Email address"
                        />
                    </div>
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
                            className={`${
                                errors.image &&
                                "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                            }relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Profile image"
                        />
                    </div>
                </div>
            )}

            <div>
                <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon
                            className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
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
