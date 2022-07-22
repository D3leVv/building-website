import { useState, createContext, ReactNode, useEffect } from "react";
import { auth } from "../../../firebase/firebase-config";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    User,
    UserCredential,
} from "firebase/auth";
import { string } from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";

export const UserContext = createContext<UserCredential | any>(null);

function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserCredential | null | any>(null);
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.log(e);
        }
    };

    const createAccount = async (email: string, password: string) => {
        try {
            const data = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(data);
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
    }, []);

    return (
        <UserContext.Provider
            value={{ user, setUser, logout, createAccount, signIn }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
