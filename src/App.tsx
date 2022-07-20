import { Suspense, lazy, useContext } from "react";
import Layout from "./layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Buildings from "./pages/Buildings";
import News from "./pages/News";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateNews from "./pages/CreateNews";
import { UserContext } from "./components/context/UserContext/UserProvider";
import ProtectedRoutes from "./layout/ProtectedRoutes";

function App() {
    const { user } = useContext<any>(UserContext);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="news" element={<News />} />
                <Route path="buildings" element={<Buildings />} />
                <Route
                    path="register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route
                    path="login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route element={<ProtectedRoutes user={user} />}>
                    <Route path="/news/create" element={<CreateNews />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
