import { createContext, useEffect, useState } from "react";
import { AuthContextType, ChildProps } from "../@types/@types";

const initialState: AuthContextType = {
    isLoggedIn: false,
    login(username, email, token, role) { },
    logout() { },
};

const AuthContext = createContext<AuthContextType>(initialState);

const AuthContextProvider = ({ children }: ChildProps) => {
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            const token = user.token;
            const email = user.email;
            const role = user.role;
            const username = user.username;

            login(username, email, token, role);
        }
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [userRole, setUserRole] = useState<string | undefined>(undefined);

    const login = (username: string, email: string, token: string, role: string) => {
        setIsLoggedIn(true);
        setEmail(email);
        setUsername(username);
        setToken(token);
        setUserRole(role)
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(undefined);
        setEmail(undefined);
        setUsername(undefined);
    };

    console.log(userRole);

    //what we want to expose/share with the app:
    const contextValues = { isLoggedIn, username, token, email, login, logout, userRole };
    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

//the provider is only used in index.tsx <Provider>
export { AuthContext, AuthContextProvider };

//used in all the app:
export default AuthContext;