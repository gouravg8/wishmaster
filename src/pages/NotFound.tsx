import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <Card className=" shadow-xl border-0 bg-card/80 backdrop-blur-sm flex flex-col items-center">
          <CardContent className="w-full flex flex-col items-center p-6 space-y-6">
            {/* Logo and Title */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">W</span>
              </div>
            </div>



            <h1 className="text-2xl font-bold text-foreground mb-2">Oops! Wrong path</h1>
            <Button
              variant="outline"
              className="border-2 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={() => navigate("/")}
              icon={<ArrowLeft />}
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default NotFound;
