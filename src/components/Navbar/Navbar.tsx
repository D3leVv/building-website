import { NavLink, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext/UserProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "@headlessui/react";
import NavbarMobile from "./NavbarMobile";

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

const settingsVariant = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, duration: 0.1 },
    },
};

const settingsChildrens = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

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
        await signOut(auth);
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
                <Menu
                    as="li"
                    className="relative flex items-center justify-center w-full h-full"
                >
                    {({ open }) => {
                        return (
                            <>
                                <Menu.Button className="p-2 border border-gray-400 outline-none hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl">
                                    Settings
                                </Menu.Button>
                                <AnimatePresence exitBeforeEnter>
                                    {open && (
                                        <Menu.Items
                                            static
                                            as={motion.div}
                                            variants={settingsVariant}
                                            animate="visible"
                                            initial="hidden"
                                            exit="hidden"
                                            key="settings"
                                            className="absolute z-20 flex flex-col items-center justify-center bg-white border border-gray-400 outline-none rounded-xl dark:bg-black dark:text-white flex-cols top-14"
                                        >
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <motion.button
                                                        variants={
                                                            settingsChildrens
                                                        }
                                                        key="child1"
                                                        className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                            active &&
                                                            "bg-gray-400"
                                                        }`}
                                                        onClick={() =>
                                                            localStorage.getItem(
                                                                "theme"
                                                            ) === "light"
                                                                ? handleDarktheme(
                                                                      "dark"
                                                                  )
                                                                : handleDarktheme(
                                                                      "light"
                                                                  )
                                                        }
                                                    >
                                                        dark/light
                                                    </motion.button>
                                                )}
                                            </Menu.Item>
                                            {!user && (
                                                <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <motion.div
                                                                variants={
                                                                    settingsChildrens
                                                                }
                                                                className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                                    active &&
                                                                    "bg-gray-400"
                                                                }`}
                                                                key="child3"
                                                            >
                                                                <NavLink to="/register">
                                                                    Register
                                                                </NavLink>
                                                            </motion.div>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <motion.div
                                                                className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                                    active &&
                                                                    "bg-gray-400"
                                                                }`}
                                                                variants={
                                                                    settingsChildrens
                                                                }
                                                                key="child4"
                                                            >
                                                                <NavLink to="/login">
                                                                    Login
                                                                </NavLink>
                                                            </motion.div>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            )}
                                            {user && (
                                                <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <motion.div
                                                                className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                                    active &&
                                                                    "bg-gray-400"
                                                                }`}
                                                                variants={
                                                                    settingsChildrens
                                                                }
                                                                key="child4"
                                                            >
                                                                <NavLink to="/profile">
                                                                    Profile
                                                                </NavLink>
                                                            </motion.div>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <motion.button
                                                                className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                                    active &&
                                                                    "bg-gray-400"
                                                                }`}
                                                                variants={
                                                                    settingsChildrens
                                                                }
                                                                key="child5"
                                                                onClick={() =>
                                                                    logout()
                                                                }
                                                            >
                                                                logout
                                                            </motion.button>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            )}
                                        </Menu.Items>
                                    )}
                                </AnimatePresence>
                            </>
                        );
                    }}
                </Menu>
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
