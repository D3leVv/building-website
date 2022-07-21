import { RadioGroup } from "@headlessui/react";

function NewsContentType({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: () => void;
    label: string;
}) {
    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label>
                {label}
                <span className="block mb-1.5 text-gray-500">
                    (Select news type)
                </span>
            </RadioGroup.Label>
            <RadioGroup.Option value="news">
                {({ active, checked }) =>
                    checked ? (
                        <div className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p>News</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 m-0.5 border-2 border-blue-800 rounded-full" />
                            <p>News</p>
                        </div>
                    )
                }
            </RadioGroup.Option>
            <RadioGroup.Option value="events">
                {({ active, checked }) =>
                    checked ? (
                        <div className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p>Events</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 m-0.5 border-2 border-blue-800 rounded-full" />
                            <p>Events</p>
                        </div>
                    )
                }
            </RadioGroup.Option>
            <RadioGroup.Option value="blog">
                {({ active, checked }) =>
                    checked ? (
                        <div className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p>Blog</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 m-0.5 border-2 border-blue-800 rounded-full" />
                            <p>Blog</p>
                        </div>
                    )
                }
            </RadioGroup.Option>
        </RadioGroup>
    );
}

export default NewsContentType;
