import { useState, createContext, ReactNode } from "react";
import { User } from "firebase/auth";

export const UserContext = createContext<User | any>(null);

function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
