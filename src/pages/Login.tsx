import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Users, Shield, Crown } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (role: string) => {
    // Mock login logic - in real app, this would validate credentials
    console.log(`Logging in as ${role} with:`, loginData);
    
    // Redirect based on role
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "teamlead":
        navigate("/teamlead");
        break;
      case "wishmaster":
        navigate("/dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const roleCards = [
    {
      id: "wishmaster",
      title: "Wishmaster",
      description: "Refer friends and earn rewards",
      icon: Users,
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      id: "teamlead",
      title: "Team Lead",
      description: "Manage your team performance",
      icon: Shield,
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      id: "admin",
      title: "Admin",
      description: "System-wide management",
      icon: Crown,
      color: "bg-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
              W
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Referral Portal</h1>
          </div>
          <p className="text-gray-600">Choose your role and sign in to continue</p>
        </div>

        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="roles">Quick Access</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Sign In</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleLogin("wishmaster")}
                >
                  Sign In
                </Button>
                
                <div className="text-center">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {roleCards.map((role) => (
                <Card 
                  key={role.id}
                  className={`${role.bgColor} border-2 hover:shadow-lg transition-all cursor-pointer group`}
                  onClick={() => handleLogin(role.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${role.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <role.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold ${role.textColor} mb-2`}>
                      {role.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {role.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className={`border-2 ${role.textColor} hover:${role.color} hover:text-white`}
                    >
                      Access {role.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                For demo purposes, click any role card to access that dashboard
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;