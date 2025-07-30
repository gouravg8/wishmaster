import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PotentialEarningsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PotentialEarningsModal = ({ open, onOpenChange }: PotentialEarningsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Potential Earnings
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Action Required Alert */}
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-semibold text-warning mb-2">Action Required</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ensure that these WMs complete the criteria mentioned in step 5 and you will earn the entire referral amount.
                  </p>
                  <div className="bg-warning/5 p-3 rounded-lg">
                    <p className="font-semibold text-foreground">Total Potential: ₹15,000</p>
                    <p className="text-sm text-muted-foreground">1 referrals in delivery stage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referrals Ready for Step 5 */}
          <div>
            <h4 className="font-semibold mb-3">Referrals Ready for Step 5</h4>
            
            <Card className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">Deepak Patel</p>
                    <p className="text-sm text-muted-foreground">9876543212 • Kirana</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-warning">₹5,000 pending</p>
                    <p className="text-sm text-muted-foreground">₹5,000 already paid</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-warning">Delivering</span>
                  <span className="text-muted-foreground">• Needs to complete Step 5 criteria</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};