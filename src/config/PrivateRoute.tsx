import { useAuth } from "@/hooks/userAuth";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    //   const { userDetails } = useContext(AuthContext);
    const { user } = useAuth();
    console.log({ user });


    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
