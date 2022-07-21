import { NavLink, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext/UserProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "@headlessui/react";
import NavbarMobile from "./NavbarMobile";
import NavbarSettings from "./NavbarSettings";
import Profile from "./Profile";

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
        name: "News",
        href: "/news",
    },
    {
        name: "Create News",
        href: "/news/create",
    },
    {
        name: "Buildings",
        href: "/buildings",
    },
];

function Navbar({
    handleDarktheme,
}: {
    handleDarktheme: (theme: "light" | "dark") => void;
}) {
    const { user, setUser } = useContext<any>(UserContext);
    const { pathname } = useLocation();
    onAuthStateChanged(auth, (currUser) => {
        setUser(currUser);
    });

    const logout = async () => {
        return await signOut(auth);
    };
    return (
        <nav className="w-full border-b border-gray-300">
            <ul className="container hidden w-full h-16 px-6 mx-auto text-center md:flex md:items-center md:justify-between">
                {links.map((link, i) => (
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
                ))}
                <NavbarSettings
                    handleDarktheme={handleDarktheme}
                    logout={logout}
                    user={user}
                />
                {user && (
                    <li>
                        <Profile />
                    </li>
                )}
            </ul>
            <NavbarMobile
                user={user}
                logout={logout}
                handleDarktheme={handleDarktheme}
                links={links}
            />
        </nav>
    );
}

export default Navbar;
