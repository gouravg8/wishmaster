import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WishmasterDashboard } from "@/components/WishmasterDashboard";
import { AuthFlow } from "@/components/AuthFlow";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"wishmaster" | "teamlead" | "admin" | null>(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (role: "wishmaster" | "teamlead" | "admin") => {
    setIsAuthenticated(true);
    setUserRole(role);
    
    if (role === "teamlead") {
      navigate("/teamlead");
    } else if (role === "admin") {
      navigate("/admin");
    }
    // For wishmaster, stay on current page (/)
  };

  if (!isAuthenticated) {
    return <AuthFlow onLoginSuccess={handleLoginSuccess} />;
  }

  // Show Wishmaster dashboard for wishmaster role
  if (userRole === "wishmaster") {
    return <WishmasterDashboard />;
  }

  // If somehow we reach here with teamlead or admin role, redirect appropriately
  if (userRole === "teamlead") {
    navigate("/teamlead");
    return null;
  }
  
  if (userRole === "admin") {
    navigate("/admin");
    return null;
  }

  return <WishmasterDashboard />;
};

export default Index;
