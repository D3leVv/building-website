import { Link } from "react-router-dom";

function Navbar({
    handleDarktheme,
}: {
    handleDarktheme: (theme: "light" | "dark") => void;
}) {
    return (
        <ul className="hidden w-full h-16 md:flex md:justify-between">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="about">About</Link>
            </li>
            <li>
                <Link to="news">News</Link>
            </li>
            <li>
                <Link to="buildings">Buildings</Link>
            </li>
            {/* <li>
                    <Link to='' ></Link>
                </li> */}
            <li>
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
        </ul>
    );
}

export default Navbar;
