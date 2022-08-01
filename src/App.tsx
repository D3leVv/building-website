import { useContext } from "react";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import News from "./pages/Store";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateNews from "./pages/CreateShip";
import { UserContext } from "./components/context/UserContext/UserProvider";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Profile from "./pages/Profile";
import MyNews from "./pages/MyShip";
import Game from "./components/Game/Game";
import LoginRegisterProtectedRoute from "./layout/LoginRegisterProtectedRoute";

function App() {
    const { loading } = useContext<any>(UserContext);

    return loading ? (
        <div>...Loading</div>
    ) : (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Game />} />
                <Route path="about" element={<About />} />
                <Route path="store" element={<News />} />
                <Route element={<LoginRegisterProtectedRoute />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/ship/create" element={<CreateNews />} />
                    <Route path="/ship/my-ship" element={<MyNews />} />
                    <Route path="/profile/:userID" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
