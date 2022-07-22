import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";

const menuAnimation = {
    whileTap: {
        rotate: 180,
    },
};

const menuOpenAnimation = {
    hidden: {
        height: 0,
        // opacity: 0,
    },
    visible: {
        height: "auto",
        // opacity: 1,

        transition: {
            ease: "linear",
            duration: 0.2,
            staggerChildren: 0.1,
        },
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.2,
            staggerChildren: 0.2,
        },
        // opacity: 0,
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

const NavbarMobile = ({
    user,
    logout,
    handleDarktheme,
    links,
}: {
    user: any;
    logout: any;
    handleDarktheme: (theme: "light" | "dark") => void;
    links: {
        name: string;
        href: string;
    }[];
}) => {
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
                                    exit="exit"
                                    variants={menuOpenAnimation}
                                    className="absolute z-10 flex flex-col items-center justify-center w-full text-center bg-white border-black dark:border-white dark:bg-black top-16 focus:outline-none"
                                >
                                    {links.map((link, i) => {
                                        if (
                                            !user &&
                                            link.name === "Create News"
                                        )
                                            return "";
                                        return (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <motion.div
                                                        variants={
                                                            settingsChildrens
                                                        }
                                                        key="child112"
                                                        className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                            active &&
                                                            "bg-gray-400"
                                                        }`}
                                                    >
                                                        <Link to={link.href}>
                                                            {link.name}
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </Menu.Item>
                                        );
                                    })}
                                    <Menu.Item>
                                        {({ active }) => (
                                            <motion.button
                                                variants={settingsChildrens}
                                                key="child10"
                                                className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                    active && "bg-gray-400"
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

                                    {!user ? (
                                        <>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <motion.div
                                                        variants={
                                                            settingsChildrens
                                                        }
                                                        key="child11"
                                                        className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                            active &&
                                                            "bg-gray-400"
                                                        }`}
                                                    >
                                                        <Link to="/register">
                                                            Register
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <motion.div
                                                        variants={
                                                            settingsChildrens
                                                        }
                                                        key="child12"
                                                        className={`w-full h-full p-3 rounded-xl hover:bg-gray-400 ${
                                                            active &&
                                                            "bg-gray-400"
                                                        }`}
                                                    >
                                                        <Link to="/login">
                                                            Login
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </Menu.Item>
                                        </>
                                    ) : (
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
                                                        key="child13"
                                                    >
                                                        <Link to="/profile">
                                                            Profile
                                                        </Link>
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
                                                        onClick={() => logout()}
                                                    >
                                                        Logout
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
    );
};

export default NavbarMobile;
