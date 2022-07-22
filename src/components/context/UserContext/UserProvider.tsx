import { useState, createContext, ReactNode, useEffect } from "react";
import {
    auth,
    writeSingleUserDocument,
} from "../../../firebase/firebase-config";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    UserCredential,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

export const UserContext = createContext<UserCredential | any>(null);

function UserProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const location: any = useLocation();
    const from =
        location.state?.from?.pathname + location.state?.from?.search || "/";
    const [user, setUser] = useState<UserCredential | null | any>(null);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.log(e);
        }
    };

    const createAccount = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        try {
            const data = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(data);
            const userPayload = {
                email,
                firstName,
                lastName,
                image: {
                    url: "",
                    alt: "",
                },
            };
            const userData = await writeSingleUserDocument(
                "Users",
                userPayload,
                user.uid
            );
            if (userData === "success") navigate(from);
            else return userData;
        } catch (error) {
            console.log(error);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const data = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(data);
            navigate(from);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            return setUser(currUser);
        });
        return () => {
            unsubscribe();
        };
    }, [signIn, createAccount, logout]);

    return (
        <UserContext.Provider
            value={{ user, setUser, logout, createAccount, signIn }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
