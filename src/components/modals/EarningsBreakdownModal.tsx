import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface EarningsBreakdownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EarningsBreakdownModal = ({ open, onOpenChange }: EarningsBreakdownModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-md mx-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Earnings Breakdown
         </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-success mb-1">Total Earned</h4>
                <p className="text-2xl font-bold text-success">₹15,000</p>
                <p className="text-sm text-muted-foreground">Amount received</p>
              </CardContent>
            </Card>
            
            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-warning mb-1">Potential Earnings</h4>
                <p className="text-2xl font-bold text-warning">₹15,000</p>
                <p className="text-sm text-muted-foreground">Pending completion</p>
              </CardContent>
            </Card>
          </div>

          {/* Earnings by Referral */}
          <div>
            <h4 className="font-semibold mb-3">Earnings by Referral</h4>
            
            <div className="space-y-3">
              {/* Amit Sharma - Completed */}
              <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Amit Sharma</span>
                  <Badge className="bg-success text-success-foreground">Completed</Badge>
                </div>
                <span className="font-semibold text-success">₹10,000</span>
              </div>

              {/* Deepak Patel - Started Delivering */}
              <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Deepak Patel</span>
                  <Badge className="bg-warning text-warning-foreground">Delivering</Badge>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-warning">₹5,000</p>
                  <p className="text-xs text-muted-foreground">+₹5,000 pending</p>
                </div>
              </div>

              {/* Vikash Singh - Onboarding */}
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Vikash Singh</span>
                  <Badge className="bg-secondary text-secondary-foreground">Onboarding</Badge>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-muted-foreground">₹0</p>
                  <p className="text-xs text-muted-foreground">+₹10,000 pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};