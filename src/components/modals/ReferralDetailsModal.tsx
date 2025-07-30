import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Referral {
  id: string;
  name: string;
  phone: string;
  status: "Completed" | "Started Delivering" | "Onboarding";
  progress: number;
  amount: number;
  location?: string;
  referralDate: string;
}

interface ReferralDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referral: Referral | null;
}

export const ReferralDetailsModal = ({ open, onOpenChange, referral }: ReferralDetailsModalProps) => {
  if (!referral) return null;

  const progressSteps = [
    { label: "Referral Submitted", description: "Invitation sent successfully", completed: true },
    { label: "App Downloaded", description: "Downloaded delivery app", completed: true },
    { label: "Onboarding Complete", description: "KYC and document verification", completed: true },
    { label: "First Delivery", description: "Started delivering orders", completed: referral.status !== "Onboarding" },
    { label: "Criteria Complete", description: "Met all requirements for reward", completed: referral.status === "Completed" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Referral Details
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Basic Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{referral.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{referral.phone}</p>
                </div>
                {referral.location && (
                  <>
                    <div>
                      <p className="text-muted-foreground">Model</p>
                      <p className="font-medium">{referral.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Referral Code</p>
                      <p className="font-medium">REF001</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4">Progress Tracking</h4>
              <div className="space-y-4">
                {progressSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CheckCircle2 
                        className={`h-5 w-5 ${
                          step.completed 
                            ? "text-success fill-success/20" 
                            : "text-muted-foreground"
                        }`} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.completed ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    <CheckCircle2 
                      className={`h-4 w-4 ${
                        step.completed 
                          ? "text-success" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Earnings Information */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Earnings Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Reward</p>
                  <p className="text-2xl font-bold text-primary">₹10,000</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                  <p className="text-2xl font-bold text-success">₹{referral.amount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Referred:</span>
                  <span>12/10/2024, 3:30:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>12/28/2024, 9:00:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};