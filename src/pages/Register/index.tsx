import { useState, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import YupPassword from "yup-password";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
YupPassword(yup);

type Register = {
    firstName: string;
    lastName: string;
    email: string;
    password: string | number;
    rePassword: string | number;
};

const schema = yup.object({
    email: yup.string().required("Email is Required").email(),
    password: yup
        .string()
        .required("Password is required")
        .min(8)
        .max(20)
        .minLowercase(1, "password must contain at least 1 lower case letter")
        .minUppercase(1, "password must contain at least 1 upper case letter")
        .minSymbols(1, "password must contain at least 1 special character"),
    rePassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    firstName: yup.string().required().min(3).max(20),
    lastName: yup.string().required().min(3).max(20),
});

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Register>({ resolver: yupResolver(schema) });
    const { createAccount } = useContext<any>(UserContext);
    const [formSubmitError, setFormSubmitError] = useState<string>();

    const onSubmit = async (data: Register) => {
        const { email, firstName, lastName } = data;
        try {
            const user = await createAccount(
                email,
                data.password.toString(),
                firstName,
                lastName
            );
            if (user !== "success")
                setFormSubmitError(
                    "Something went wrong! Please refresh the page and try again!"
                );
        } catch (e: any) {
            console.log(e.message);
            setFormSubmitError(e.message);
        }
    };

    return (
        <div className="container flex items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Register your account
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-6"
                >
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
                                    <p className="text-gray-500">
                                        Email address
                                    </p>
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
                                <label htmlFor="password">
                                    <p className="text-gray-500">Password</p>
                                    {errors.password && (
                                        <p className="text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </label>
                                <input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className={`${
                                        errors.password &&
                                        "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                                    }relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <label htmlFor="rePassword">
                                    <p className="text-gray-500">
                                        Repeat-password
                                    </p>
                                    {errors.rePassword && (
                                        <p className="text-red-500">
                                            {errors.rePassword.message}
                                        </p>
                                    )}
                                </label>
                                <input
                                    {...register("rePassword")}
                                    id="rePassword"
                                    type="password"
                                    className={`${
                                        errors.rePassword &&
                                        "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                                    }relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="repeat-password"
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
                            Register
                        </button>
                    </div>
                    <Link
                        className="underline hover:text-gray-600 dark:text-white decoration-blue-400"
                        to="/login"
                    >
                        Have account? Click here to login!
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
