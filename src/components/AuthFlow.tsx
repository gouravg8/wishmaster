import { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { HelpCircle, Smartphone } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOtp, validateOtp } from "@/services/AuthService";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

interface AuthFlowProps {
  onLoginSuccess: (role: "wishmaster" | "teamlead" | "admin") => void;
}

export const AuthFlow = ({ onLoginSuccess }: AuthFlowProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const cancelTokenSourceRef = useRef<any>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getOtp"],
    queryFn: async () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.abort();
      }
      cancelTokenSourceRef.current = new AbortController();
      const res = await getOtp(phoneNumber, cancelTokenSourceRef.current.signal);
      return res;
    },
    enabled: false,
  });

  const { data: validateData, isLoading: validateLoadin, error: validateError, refetch: validateRefetch } = useQuery({
    queryKey: ["validateOtp"],
    queryFn: async () => await validateOtp({ phone: phoneNumber, otp }),
    enabled: false
  })

  const handleSendOtp = () => {
    if (Number(phoneNumber)) {
      console.log({ type: typeof phoneNumber, phoneNumber, numPh: Number(phoneNumber) })
    }
    if (phoneNumber.length === 10) {
      refetch();
      console.log("fetching the data");
    }
  };


  useEffect(() => {
    if (localStorage.getItem("wishmasterUser")) {
      navigate("/dashboard");
    }
  }, [])

  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        error?.message ||
        "An error occurred";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      console.log("error", { error, errorMessage });
    }
  }, [error, toast]);

  useEffect(() => {
    if (data && (data.status === 200 || data.statusText === 'OK')) {
      setStep("otp");
    }
  }, [data]);

  useEffect(() => {
    if (validateData && (validateData?.status === 200 || validateData?.statusText === 'OK')) {
      localStorage.setItem("wishmasterUser", JSON.stringify(validateData?.data));
      if (validateData?.data?.roles?.includes("LMA_WISHMASTER_USER")) {
        navigate("/dashboard");
      }
    }
  }, [validateData]);

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      validateRefetch();
      // Mock authentication logic
      if (phoneNumber === "1000000000" && otp === "1234") {
        console.log("Wishmaster login successful");
        onLoginSuccess("wishmaster");
      } else if (phoneNumber === "2000000000" && otp === "1234") {
        console.log("Team Lead login successful");
        onLoginSuccess("teamlead");
      } else if (phoneNumber === "3000000000" && otp === "1234") {
        console.log("Admin login successful");
        onLoginSuccess("admin");
      } else {
        console.log("Invalid credentials");
        // Handle invalid credentials here
      }
    }
  };

  const handleChangeNumber = () => {
    setStep("phone");
    setOtp("");
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.abort();
    }
    queryClient.resetQueries({ queryKey: ["getOtp"] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">W</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Wishmasters Portal</h1>
          <p className="text-muted-foreground">
            {step === "phone"
              ? "Enter your mobile number"
              : "Enter the OTP sent to your phone"
            }
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            {step === "phone" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium">
                    Mobile Number
                  </Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mobile"
                      type="tel"
                      pattern="[0-9]{10}"
                      inputMode="numeric"
                      placeholder="Enter 10-digit mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10 h-12 text-base"
                      maxLength={10}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendOtp}
                  disabled={phoneNumber.length !== 10 || isLoading}
                  className="w-full h-12 text-base font-medium"
                  size="lg"
                  isLoading={isLoading}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Enter OTP</h3>
                    <p className="text-sm text-muted-foreground">
                      OTP sent to +91 {phoneNumber}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                        <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                        <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                        <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                        <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                        <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || validateLoadin}
                  className="w-full h-12 text-base font-medium"
                  size="lg"
                  isLoading={validateLoadin}
                >
                  Verify OTP
                </Button>

                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={handleChangeNumber}
                    className="text-primary"
                  >
                    Change mobile number
                  </Button>
                </div>
              </>
            )}

            <div className="text-center pt-4 border-t border-border">
              Already have account? <Link to={"/login"} className="text-blue-600" >Login</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};