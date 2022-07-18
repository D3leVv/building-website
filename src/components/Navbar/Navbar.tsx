import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext/UserProvider";

function Navbar({
    handleDarktheme,
}: {
    handleDarktheme: (theme: "light" | "dark") => void;
}) {
    const logout = async () => {
        await signOut(auth);
    };

    const { user } = useContext<any>(UserContext);
    return (
        <ul className="hidden w-full h-16 text-center border-b border-gray-300 md:flex md:justify-around md:items-center">
            <li className="w-full h-full">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center justify-center w-full h-full text-center border-b border-yellow-300"
                            : "flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent"
                    }
                    to="/"
                >
                    Home
                </NavLink>
            </li>
            <li className="w-full h-full">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center justify-center w-full h-full text-center border-b border-yellow-300"
                            : "flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent"
                    }
                    to="about"
                >
                    About
                </NavLink>
            </li>
            <li className="w-full h-full">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center justify-center w-full h-full text-center border-b border-yellow-300"
                            : "flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent"
                    }
                    to="news"
                >
                    News
                </NavLink>
            </li>
            <li className="w-full h-full">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center justify-center w-full h-full text-center border-b border-yellow-300"
                            : "flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent"
                    }
                    to="buildings"
                >
                    Buildings
                </NavLink>
            </li>
            {/* <li className='w-full h-full'>
                    <NavLink to='' ></NavLink>
                </li> */}
            <li className="w-full h-full">
                <button
                    className="flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent"
                    onClick={() =>
                        localStorage.getItem("theme") === "light"
                            ? handleDarktheme("dark")
                            : handleDarktheme("light")
                    }
                >
                    dark/light
                </button>
            </li>
            {!user && (
                <>
                    <li className="w-full h-full">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "flex flex-col items-center justify-center w-full h-full text-center border-b border-yellow-300"
                                    : "flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent"
                            }
                            to="register"
                        >
                            Register
                        </NavLink>
                    </li>
                    <li className="w-full h-full">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "flex flex-col items-center justify-center w-full h-full text-center border-b border-yellow-300"
                                    : "flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent"
                            }
                            to="login"
                        >
                            Login
                        </NavLink>
                    </li>
                </>
            )}
            {user && (
                <li className="w-full h-full">
                    <button
                        className="flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent"
                        onClick={() => logout()}
                    >
                        logout
                    </button>
                </li>
            )}
        </ul>
    );
}

export default Navbar;
