import {
    useState,
    createContext,
    ReactNode,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";
import {
    auth,
    getSingleDocWithDocId,
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
import { DocumentData } from "firebase/firestore";

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

    loading: boolean;
    userData: User | DocumentData | undefined;
    error: any;
};

export const UserContext = createContext({} as Context);

function UserProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const location: any = useLocation();
    const from =
        location.state?.from?.pathname + location.state?.from?.search || "/";
    const [user, setUser] = useState<UserCredential["user"] | null>(null);
    const [userData, setUserData] = useState<User | DocumentData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

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
            setUser(data.user);
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
                data.user.uid
            );
            if (userData === "success") navigate(from);
            else return userData;
        } catch (error: any) {
            setError(error);
            console.log(error.message);
        }
    };

    const signIn = async (email: string, password: string) => {
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
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
            setUser(currUser);
            if (currUser) {
                const data = await getSingleDocWithDocId("Users", currUser.uid);
                if (data) {
                    setUserData(data);
                }
            }
            return setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

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
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
