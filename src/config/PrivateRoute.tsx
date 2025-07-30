import { Navigate } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    //   const { userDetails } = useContext(AuthContext);

    //   if (!userDetails) {
    return <Navigate to="/login" />;
    //   }

    //   return children;
};

export default PrivateRoute;
