import { createContext, useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

type User = {
    fhr_id: string;
    id: string;
    name: string;
    profile_id: string;
    roles: string[];
    token: string;
}

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthState must be used within a AuthProvider");
    return context;
}

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("wishmasterUser")));

    const handleLogout = () => {
        localStorage.removeItem("wishmasterUser");
        setUser(null);
        navigate("/");
    }


    const handleLogin = (userRes: User) => {
        if (!userRes) return;
        setUser(userRes);
        localStorage.setItem("wishmasterUser", JSON.stringify(userRes));
    }


    const value = {
        user,
        handleLogin,
        handleLogout
    }

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}

export default AuthProvider;