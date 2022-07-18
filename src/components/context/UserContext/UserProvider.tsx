import { useState, createContext, ReactNode } from "react";

export const UserContext = createContext({});

function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<null | any>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
