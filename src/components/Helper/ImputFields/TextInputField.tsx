import { FieldError } from "react-hook-form";

function TextInputField({
    label,
    error,
    id,
    type,
    autoComplete,
    placeholder,
    onChange,
}: {
    label: string;
    error: FieldError | undefined;
    id: string;
    type: string;
    autoComplete?: string;
    placeholder: string;
    onChange: (...event: any[]) => void;
}) {
    console.log(error);
    return (
        <div>
            <label htmlFor="email-address">
                <p className="text-gray-500">{label}</p>
                {error && <p className="text-red-500">{error.message}</p>}
            </label>
            <input
                onChange={onChange}
                id={id}
                type={type}
                autoComplete={autoComplete}
                className={`${
                    error &&
                    "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                }relative block dark:bg-black dark:focus-within:bg-black  dark:focus:text-white dark:text-white w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={placeholder}
            />
        </div>
    );
}

export default TextInputField;
