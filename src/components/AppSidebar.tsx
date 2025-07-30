import { Home, Users, MessageSquare, Trophy, BarChart3, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const getNavigationItems = (isAdmin = false) => {
  if (isAdmin) {
    return [
      {
        title: "Dashboard",
        icon: Home,
        url: "/admin"
      },
      {
        title: "Referrals",
        icon: FileText,
        url: "/admin/referrals"
      },
      {
        title: "Analytics",
        icon: BarChart3,
        url: "/admin/analytics"
      }
    ];
  }
  
  return [
    {
      title: "Dashboard",
      icon: Home,
      url: "/dashboard"
    },
    {
      title: "Refer & Earn",
      icon: Users,
      url: "/refer"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      url: "/messages"
    },
    {
      title: "Rankings",
      icon: Trophy,
      url: "/rankings"
    }
  ];
};

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
}

export const AppSidebar = ({ open, onOpenChange, isAdmin = false }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationItems = getNavigationItems(isAdmin);

  const handleNavigation = (url: string) => {
    navigate(url);
    onOpenChange(false);
  };

  return (
    <div className={`fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-border transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="pt-20 px-4"> {/* Add top padding to account for header */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavigation(item.url)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                location.pathname === item.url
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-base">{item.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};