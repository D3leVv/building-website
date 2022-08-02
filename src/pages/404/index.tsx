import { Link } from "react-router-dom";

/* This example requires Tailwind CSS v2.0+ */
export default function ErrorPage() {
    return (
        <>
            <div className="min-h-full px-4 py-16 bg-white dark:bg-black sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
                <div className="mx-auto max-w-max">
                    <main className="sm:flex">
                        <p className="text-4xl font-extrabold text-yellow-400 sm:text-5xl">
                            404
                        </p>
                        <div className="sm:ml-6">
                            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                                    Page not found
                                </h1>
                                <p className="mt-1 text-base text-gray-500">
                                    Please check the URL in the address bar and
                                    try again.
                                </p>
                            </div>
                            <div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                                <Link
                                    to="/"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-400 border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                >
                                    Go back home
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
