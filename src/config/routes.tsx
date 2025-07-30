import AdminAnalytics from "@/pages/AdminAnalytics";
import AdminIndex from "@/pages/AdminIndex";
import AdminReferrals from "@/pages/AdminReferrals";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/NotFound";
import Rankings from "@/pages/Rankings";
import ReferEarn from "@/pages/ReferEarn";
import TeamLeadIndex from "@/pages/TeamLeadIndex";
import { BrowserRouter, Route, Routes } from "react-router-dom";


type RouteConfig = {
    path: string;
    element: React.ReactNode;
    private?: boolean;
}[];

export const routesConfig: RouteConfig = [
    { path: "/login", element: <Login /> },
    { path: "/", element: <Index /> },
    { path: "/dashboard", element: <Index /> },
    { path: "/refer", element: <ReferEarn /> },
    { path: "/messages", element: <Messages /> },
    { path: "/rankings", element: <Rankings /> },
    { path: "/teamlead", element: <TeamLeadIndex /> },
    { path: "/admin", element: <AdminIndex /> },
    { path: "/admin/referrals", element: <AdminReferrals /> },
    { path: "/admin/analytics", element: <AdminAnalytics /> },
    { path: "*", element: <NotFound /> }
]

const RoutesConfig = () => {
    // if(!userDetails) {
    //     return <Navigate to="/login" />;
    // }

    return (
        <BrowserRouter>
            <Routes>
                {routesConfig?.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesConfig;