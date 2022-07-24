import React, { createContext, ReactNode, useEffect, useState } from "react";

export const DarkThemeContext = createContext({});

function DarkThemeProvider({ children }: { children: ReactNode }) {
    const [dark, setDark] = useState<string | null>(
        localStorage.getItem("theme")
    );
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
        <DarkThemeContext.Provider value={{ handleDarktheme, dark }}>
            {children}
        </DarkThemeContext.Provider>
    );
}

export default DarkThemeProvider;
