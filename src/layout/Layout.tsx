import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Layout() {
    return (
        <div className="w-full h-full min-h-screen dark:bg-black dark:text-white">
            <Navbar />
            <Outlet />
        </div>
    );
}

export default Layout;
