import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
});

type Login = {
    email: string;
    password: string | number;
    rePassword: string | number;
};

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({ resolver: yupResolver(schema) });

    const { signIn } = useContext<any>(UserContext);

    const onSubmit = async (data: Login) => {
        try {
            const user = await signIn(data.email, data.password.toString());
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <div className="container flex items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                        Login to your account
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-6"
                >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
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
                                }relative block dark:bg-black dark:text-white w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
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
                                }relative block w-full dark:bg-black dark:text-white px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400 dark:text-indigo-300 dark:group-hover:text-idnigo-200"
                                    aria-hidden="true"
                                />
                            </span>
                            Sign in
                        </button>
                    </div>
                    <Link
                        className="underline hover:text-gray-600 dark:text-white decoration-blue-400"
                        to="/register"
                    >
                        Don't have account? Click here to register!
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
