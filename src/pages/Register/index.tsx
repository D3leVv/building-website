import { useState, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Controller, useForm } from "react-hook-form";
import YupPassword from "yup-password";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInputField from "../../components/Helper/ImputFields/TextInputField";
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
    {
        name: "password",
        id: "password",
        placeholder: "Password",
        type: "password",
        // autoComplete: 'email'
    },
    {
        name: "rePassword",
        id: "rePassword",
        placeholder: "rePassword",
        type: "password",
        // autoComplete: 'email'
    },
];

function Register() {
    const { control, handleSubmit } = useForm<Register>({
        resolver: yupResolver(schema),
    });
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
        <div className="container flex items-center justify-center px-6 mx-auto ">
            <div className="w-full max-w-lg space-y-8">
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
                            {inputFields.map((field, i) => (
                                <Controller
                                    key={i}
                                    control={control}
                                    name={field.name}
                                    render={({
                                        field: { onChange },
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
                                        />
                                    )}
                                />
                            ))}
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
