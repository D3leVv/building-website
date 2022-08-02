import { useContext } from "react";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Store from "./pages/Store";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateShip from "./pages/CreateShip";
import { UserContext } from "./components/context/UserContext/UserProvider";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Profile from "./pages/Profile";
import MyShip from "./pages/MyShip";
import Game from "./components/Game/Game";
import LoginRegisterProtectedRoute from "./layout/LoginRegisterProtectedRoute";
import ShipsDetailsPage from "./pages/Details";
import ErrorPage from "./pages/404";
import DetailsPageGuard from "./layout/DetailsPageGuard";

function App() {
    const { loading } = useContext<any>(UserContext);

    return loading ? (
        <div>...Loading</div>
    ) : (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Game />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="about" element={<About />} />
                <Route path="store" element={<Store />} />

                <Route element={<DetailsPageGuard />}>
                    <Route
                        path="/store/details/:shipID"
                        element={<ShipsDetailsPage />}
                    />
                </Route>
                <Route element={<LoginRegisterProtectedRoute />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/ship/create" element={<CreateShip />} />
                    <Route path="/ship/my-ship" element={<MyShip />} />
                    <Route path="/profile/:userID" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
