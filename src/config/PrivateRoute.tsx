import { useAuth } from "@/hooks/userAuth";
import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    //   const { userDetails } = useContext(AuthContext);
    const { pathname } = useLocation();
    console.log({ pathname });

    const { user } = useAuth();
    console.log({ user });

    // if (pathname.startsWith("/admin") && !user?.roles?.includes("LMA_ADMIN")) {
    //     return <Navigate to="/" />
    // }

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
