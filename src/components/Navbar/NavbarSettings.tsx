import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { DarkThemeContext } from "../context/DarkTheme/DarkTheme";

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

function NavbarSettings({
    user,
    logout,
}: {
    user: any;
    logout: () => Promise<void>;
}) {
    const { handleDarktheme } = useContext<any>(DarkThemeContext);
    return (
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
                                                variants={settingsChildrens}
                                                key="child1"
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
                                                        <NavLink
                                                            to={`/profile/${user.uid}`}
                                                        >
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
                                                        onClick={() => logout()}
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
    );
}

export default NavbarSettings;
