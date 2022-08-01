import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext/UserProvider";
import NavbarMobile from "./NavbarMobile";
import NavbarSettings from "./NavbarSettings";
import Profile from "./Profile";
import { GameContext } from "../context/GameContext";

export type svgVariants = {
    hidden: {
        rotate: number;
        transition: {
            duration: number;
        };
    };
    visible: {
        rotate: number;
        transition: {
            duration: number;
        };
    };
};

const links = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Store",
        href: "/store",
    },

    {
        name: "My Ship",
        href: "/ship/my-ship",
    },
];

function Navbar({}: {}) {
    const { user, logout } = useContext<any>(UserContext);
    const { pathname } = useLocation();
    const { gameOver, escKey } = useContext<any>(GameContext);
    return gameOver ||
        escKey ||
        (pathname.startsWith("/") && pathname.length > 2) ? (
        <nav className="relative z-40 w-full border-b border-gray-300">
            <ul className="container hidden w-full h-16 px-6 mx-auto text-center md:flex md:items-center md:justify-between">
                {links.map((link, i) => {
                    if (!user && link.name === "My news") return "";
                    return (
                        <li key={i} className="w-full h-full">
                            <NavLink
                                className={({ isActive }) => {
                                    return link.href.endsWith(pathname)
                                        ? "flex flex-col items-center justify-center w-full h-full text-center border-b border-yellow-300"
                                        : "flex flex-col items-center justify-center w-full h-full text-center border-b border-transparent";
                                }}
                                to={link.href}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    );
                })}
                <NavbarSettings logout={logout} user={user} />
                {user && (
                    <li>
                        <Profile />
                    </li>
                )}
            </ul>
            <NavbarMobile user={user} logout={logout} links={links} />
        </nav>
    ) : (
        <div></div>
    );
}

export default Navbar;
