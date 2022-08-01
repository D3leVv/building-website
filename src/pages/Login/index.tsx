import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInputField from "../../components/Helper/ImputFields/TextInputField";

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

const inputFields: any[] = [
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
];

type LoginType = {
    email: string;
    password: string | number;
    rePassword: string | number;
};

function Login() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginType>({ resolver: yupResolver(schema) });

    const { signIn, error } = useContext<any>(UserContext);

    const onSubmit = async (data: LoginType) => {
        try {
            const user = await signIn(data.email, data.password.toString());
            if (error) reset(user);
        } catch (e: any) {
            reset(data);
        }
    };

    return (
        <div className="container flex items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                        Login to your account
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-6"
                >
                    {error && (
                        <div className="text-red-500">
                            Wrong email or password
                        </div>
                    )}
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="flex flex-col gap-3 -space-y-px rounded-md shadow-sm">
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
                                        // value={value}
                                    />
                                )}
                            />
                        ))}
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
