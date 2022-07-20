import { Link, NavLink, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext/UserProvider";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

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

const menuAnimation = {
    whileTap: {
        rotate: 180,
    },
};

const menuOpenAnimation = {
    hidden: {
        height: 0,
    },
    visible: {
        height: "auto",

        transition: {
            ease: "linear",
            duration: 0.2,
            staggerChildren: 0.03,
        },
    },
};

const childVariants = {
    hidden: {
        height: 0,
        opacity: 0,
        transition: {
            ease: "linear",
            duration: 0.2,
            staggerChildren: 0.03,
        },
    },
    visible: {
        height: "auto",
        opacity: 1,
        transition: {
            ease: "linear",
            duration: 0.03,
        },
    },
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
                                console.log(link.href, pathname);
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
                                <Menu.Button className="outline-none">
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
                                            className="absolute z-20 flex flex-col items-center justify-center bg-white border border-gray-400 rounded outline-none dark:bg-black dark:text-white flex-cols top-14"
                                        >
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <motion.button
                                                        variants={
                                                            settingsChildrens
                                                        }
                                                        key="child1"
                                                        className={`w-full h-full p-3 hover:bg-gray-400 ${
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
                                                                className={`w-full h-full p-3 hover:bg-gray-400 ${
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
                                                                className={`w-full h-full p-3 hover:bg-gray-400 ${
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
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <motion.button
                                                            className={`w-full h-full p-3 hover:bg-gray-400 ${
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
                                            )}
                                        </Menu.Items>
                                    )}
                                </AnimatePresence>
                            </>
                        );
                    }}
                </Menu>
            </ul>
            <MobileNav user={user} logout={logout} />
        </nav>
    );
}

const MobileNav = ({ user, logout }: { user: any; logout: any }) => {
    return (
        <Menu
            as="div"
            className={`flex dark:bg-black bg-white flex-col container mx-auto w-full items-center h-16 z-5000 md:hidden`}
        >
            {({ open }) => {
                return (
                    <>
                        <div className="flex justify-end w-full mt-4 mr-10 gap-x-6">
                            <Menu.Button
                                as={motion.button}
                                whileTap="whileTap"
                                variants={menuAnimation}
                                className=" focus:outline-none"
                            >
                                {open ? (
                                    <XIcon
                                        className="block w-6 h-6"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <MenuIcon
                                        className="block w-6 h-6"
                                        aria-hidden="true"
                                    />
                                )}
                            </Menu.Button>
                        </div>

                        <AnimatePresence exitBeforeEnter>
                            {open && (
                                <Menu.Items
                                    as={motion.div}
                                    static
                                    key="items"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={menuOpenAnimation}
                                    className="absolute z-10 w-full bg-white border-black dark:bg-black top-16 focus:outline-none"
                                >
                                    {links.map((link, i) => (
                                        <motion.div variants={childVariants}>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to={link.href}
                                                        className={`${
                                                            active
                                                                ? "text-black"
                                                                : ""
                                                        }   border-black  flex items-center justify-center px-3 py-2 text-gray hover:text-black w-full`}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </motion.div>
                                    ))}

                                    {!user ? (
                                        <>
                                            <motion.div
                                                variants={childVariants}
                                            >
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/register"
                                                            className={`${
                                                                active
                                                                    ? "text-black"
                                                                    : ""
                                                            }   border-black  flex items-center justify-center px-3 py-2 text-gray hover:text-black w-full`}
                                                        >
                                                            Register
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </motion.div>
                                            <motion.div
                                                variants={childVariants}
                                            >
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/login"
                                                            className={`${
                                                                active
                                                                    ? "text-black"
                                                                    : ""
                                                            }   border-black  flex items-center justify-center px-3 py-2 text-gray hover:text-black w-full`}
                                                        >
                                                            Login
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </motion.div>
                                        </>
                                    ) : (
                                        <motion.button
                                            className="flex items-center justify-center w-full px-3 py-2 border-black text-gray hover:text-black"
                                            variants={childVariants}
                                            onClick={() => logout()}
                                        >
                                            Logout
                                        </motion.button>
                                    )}
                                </Menu.Items>
                            )}
                        </AnimatePresence>
                    </>
                );
            }}
        </Menu>
    );
};

export default Navbar;
