import {
    useState,
    createContext,
    ReactNode,
    useEffect,
    Dispatch,
    SetStateAction,
    useCallback,
} from "react";
import {
    auth,
    getSingleDocWithDocId,
    updateSingleDocumentWithDocID,
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
import { User } from "../../../Types/User";

type Context = {
    user: UserCredential["user"] | null;
    setUser: Dispatch<SetStateAction<UserCredential["user"] | null>>;
    logout: () => Promise<void>;
    createAccount: (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<string | undefined>;
    signIn: (email: string, password: string) => Promise<void>;
    updateUserData: (val: User) => Promise<void>;
    loading: boolean;
    userData: User | null;
    error: any;
};

export const UserContext = createContext({} as Context);

function UserProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const location: any = useLocation();
    const from =
        location.state?.from?.pathname + location.state?.from?.search || "/";
    const [user, setUser] = useState<UserCredential["user"] | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const createAccount = useCallback(
        async (
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
                setUser(data.user);
                const userPayload = {
                    email,
                    firstName,
                    lastName,
                    image: {
                        url: "",
                        alt: "",
                    },
                    score: 0,
                    heroShip: "",
                };
                const userData = await writeSingleUserDocument(
                    "Users",
                    userPayload,
                    data.user.uid
                );
                if (userData === "success") navigate(from);
                else return userData;
            } catch (error: any) {
                setError(error);
                console.log(error.message);
            }
        },
        []
    );

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const data = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(data.user);
            navigate(from);
        } catch (error: any) {
            return setError(error.message);
        }
    }, []);

    const updateUserData = useCallback(
        async (data: User) => {
            try {
                if (user) {
                    await updateSingleDocumentWithDocID(
                        "Users",
                        data,
                        user.uid
                    );
                }
            } catch (e: any) {
                console.log(e);
                setError(e);
            }
        },
        [user]
    );

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
            setUser(currUser);
            if (currUser) {
                const data = (await getSingleDocWithDocId(
                    "Users",
                    currUser.uid
                )) as User;
                if (data) {
                    setUserData(data);
                }
            }
            return setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [updateUserData, signIn, createAccount]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                logout,
                createAccount,
                signIn,
                loading,
                userData,
                error,
                updateUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
