import { useState, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import YupPassword from "yup-password";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

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
    image: yup.object({
        url: yup.string().required('Image URL is Required').min(3).max(3),
        alt: yup.string().required('Image ALT is Required').min(3).max(3),
    })
});

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Register>();
    const { setUser } = useContext<any>(UserContext);
    const location: any = useLocation();
    const navigate = useNavigate();

    const from =
        location.state?.from?.pathname + location.state?.from?.search || "/";

    onAuthStateChanged(auth, (currUser) => {
        setUser(currUser);
    });

    const onSubmit = async (data: Register) => {
        try {
            if (data.password !== data.rePassword) return;
            const user = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password.toString()
            );
            setUser(user);

            navigate(from);
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <div className="container flex items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    {/* <img
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    /> */}
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Register your account
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-6"
                >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                {...register("email")}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                {...register("password")}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="rePassword" className="sr-only">
                                repeat-password
                            </label>
                            <input
                                {...register("rePassword")}
                                id="rePassword"
                                name="rePassword"
                                type="rePassword"
                                autoComplete="current-rePassword"
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="repeat-password"
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
                                    className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                            Sign in
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
