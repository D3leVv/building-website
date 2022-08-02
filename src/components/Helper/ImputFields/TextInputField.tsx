import { FieldError } from "react-hook-form";

type Props = {
    label: string;
    error: FieldError | undefined;
    id: string;
    type: string;
    autoComplete?: string;
    placeholder: string;
    value?: string | number;
    onChange: (...event: any[]) => void;
};

function TextInputField(props: Props) {
    return (
        <div>
            <label htmlFor="email-address">
                <p className="text-gray-500">{props.label}</p>
                {props.error && (
                    <p className="text-red-500">{props.error.message}</p>
                )}
            </label>
            <input
                {...props}
                className={`${
                    props.error &&
                    "border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                }relative block mt-1 dark:bg-black dark:focus-within:bg-black  dark:focus:text-white dark:text-white w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
            />
        </div>
    );
}

export default TextInputField;
