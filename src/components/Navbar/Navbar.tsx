import { Link } from "react-router-dom";

function Navbar({
    handleDarktheme,
}: {
    handleDarktheme: (theme: "light" | "dark") => void;
}) {
    return (
        <ul className="hidden w-full h-16 text-center border-b border-gray-300 md:flex md:justify-around md:items-center">
            <li className="flex flex-col items-center justify-center w-full h-full text-center hover:border-b hover:border-yellow-300">
                <Link to="/">Home</Link>
            </li>
            <li className="flex flex-col items-center justify-center w-full h-full text-center hover:border-b hover:border-yellow-300">
                <Link to="about">About</Link>
            </li>
            <li className="flex flex-col items-center justify-center w-full h-full text-center hover:border-b hover:border-yellow-300">
                <Link to="news">News</Link>
            </li>
            <li className="flex flex-col items-center justify-center w-full h-full text-center hover:border-b hover:border-yellow-300">
                <Link to="buildings">Buildings</Link>
            </li>
            {/* <li>
                    <Link to='' ></Link>
                </li> */}
            <li className="flex flex-col items-center justify-center w-full h-full text-center hover:border-b hover:border-yellow-300">
                <button
                    onClick={() =>
                        localStorage.getItem("theme") === "light"
                            ? handleDarktheme("dark")
                            : handleDarktheme("light")
                    }
                >
                    dark/light
                </button>
            </li>
            <li className="flex flex-col items-center justify-center w-full h-full text-center hover:border-b hover:border-yellow-300">
                <Link to="register">Register</Link>
            </li>
        </ul>
    );
}

export default Navbar;
