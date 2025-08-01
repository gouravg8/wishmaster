import { WishmasterDashboard } from "@/components/WishmasterDashboard";
import AuthProvider from "@/hooks/userAuth";
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
import PrivateRoute from "./PrivateRoute";


type RouteConfig = {
    path: string;
    element: React.ReactNode;
    private?: boolean;
}[];

export const routesConfig: RouteConfig = [
    { path: "/login", element: <Login /> },
    { path: "/", element: <Index /> },
    { path: "/dashboard", element: <PrivateRoute children={<WishmasterDashboard />} /> },
    { path: "/refer", element: <PrivateRoute children={<ReferEarn />} /> },
    { path: "/messages", element: <PrivateRoute children={<Messages />} /> },
    { path: "/rankings", element: <PrivateRoute children={<Rankings />} /> },
    { path: "/teamlead", element: <PrivateRoute children={<TeamLeadIndex />} /> },
    { path: "/admin", element: <PrivateRoute children={<AdminIndex />} /> },
    { path: "/admin/referrals", element: <PrivateRoute children={<AdminReferrals />} /> },
    { path: "/admin/analytics", element: <PrivateRoute children={<AdminAnalytics />} /> },
    { path: "*", element: <NotFound /> }
];


const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {routesConfig?.map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default RoutesConfig;