import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReferralStatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReferralStatsModal = ({ open, onOpenChange }: ReferralStatsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Referral Statistics
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-primary mb-1">Total Referrals</h4>
                <p className="text-3xl font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">All time referrals made</p>
              </CardContent>
            </Card>
            
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-success mb-1">Completed</h4>
                <p className="text-3xl font-bold text-success">1</p>
                <p className="text-sm text-muted-foreground">Successfully completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Status Breakdown */}
          <div>
            <h4 className="font-semibold mb-3">Referral Status Breakdown</h4>
            
            <div className="space-y-3">
              {[
                { label: "Submitted", count: 0, color: "text-muted-foreground" },
                { label: "App Downloaded", count: 0, color: "text-muted-foreground" },
                { label: "Onboarding", count: 1, color: "text-secondary-foreground" },
                { label: "Started Delivering", count: 1, color: "text-warning" },
                { label: "Completed", count: 1, color: "text-success" },
              ].map((status) => (
                <div key={status.label} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <span className="font-medium">{status.label}</span>
                  <span className={`font-bold text-lg ${status.color}`}>
                    {status.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};