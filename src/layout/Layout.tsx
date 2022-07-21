import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../components/context/UserContext/UserProvider";
import Navbar from "../components/Navbar/Navbar";

function Layout() {
    const [dark, setDark] = useState<string | null>(
        localStorage.getItem("theme")
    );
    const { user } = useContext<any>(UserContext);
    //handles darktheme
    const handleDarktheme = (theme: "light" | "dark") => {
        localStorage.setItem("theme", theme);
        setDark(localStorage.getItem("theme"));
    };

    //useEffect to to change darktheme
    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        const onStorage = () => {
            setDark(localStorage.getItem("theme"));
        };

        window.addEventListener("storage", onStorage);

        return () => {
            window.removeEventListener("storage", onStorage);
        };
    }, [dark]);

    return (
        <div className="w-full h-full min-h-screen dark:bg-black dark:text-white">
            <Navbar handleDarktheme={handleDarktheme} />
            <Outlet />
        </div>
    );
}

export default Layout;
