import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/context/UserContext/UserProvider";
import NewsProvider from "./components/context/ShipContext/ShipProvider";
import DarkThemeProvider from "./components/context/DarkTheme/DarkTheme";
import GameProvider from "./components/context/GameContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <NewsProvider>
                    <DarkThemeProvider>
                        <GameProvider>
                            <App />
                        </GameProvider>
                    </DarkThemeProvider>
                </NewsProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
