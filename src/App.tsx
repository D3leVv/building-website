import { useContext } from "react";
import Layout from "./layout/Layout";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Buildings from "./pages/Buildings";
import News from "./pages/News";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateNews from "./pages/CreateNews";
import { UserContext } from "./components/context/UserContext/UserProvider";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Profile from "./pages/Profile";

function App() {
    const { user } = useContext<any>(UserContext);
    const location: any = useLocation();
    const from =
        location.state?.from?.pathname + location.state?.from?.search || "/";

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="news" element={<News />} />
                <Route path="buildings" element={<Buildings />} />
                <Route
                    path="register"
                    element={user ? <Navigate to={from} /> : <Register />}
                />
                <Route
                    path="login"
                    element={user ? <Navigate to={from} /> : <Login />}
                />
                <Route element={<ProtectedRoutes user={user} />}>
                    <Route path="/news/create" element={<CreateNews />} />
                    <Route path="/profile/:userID" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
