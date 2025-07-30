import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AdminReferral {
  id: string;
  refereeName: string;
  refereePhone: string;
  referredBy: string;
  status: "submitted" | "app_downloaded" | "onboarding" | "first_delivery" | "completed";
  model: "TrueFlex" | "Kirana";
  reward: number;
  date: string;
  panNumber?: string;
  aadhaarNumber?: string;
  referralCode?: string;
  createdDate?: string;
}

interface ReferralViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referral: AdminReferral | null;
}

export const ReferralViewModal = ({ open, onOpenChange, referral }: ReferralViewModalProps) => {
  if (!referral) return null;

  const getStatusLabel = (status: string) => {
    const statusMap = {
      submitted: "Submitted",
      app_downloaded: "App Downloaded", 
      onboarding: "Onboarding",
      first_delivery: "First Delivery",
      completed: "Completed"
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "first_delivery":
        return "text-orange-600";
      case "onboarding":
        return "text-yellow-600";
      case "app_downloaded":
        return "text-blue-600";
      case "submitted":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-lg font-semibold">
            Referral Details
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Referee Name</label>
            <p className="text-sm text-gray-900 mt-1">{referral.refereeName}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <p className="text-sm text-gray-900 mt-1">{referral.refereePhone}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">PAN Number</label>
            <p className="text-sm text-gray-900 mt-1">{referral.panNumber || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Aadhaar Number</label>
            <p className="text-sm text-gray-900 mt-1">{referral.aadhaarNumber || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Referral Code</label>
            <p className="text-sm text-gray-900 mt-1">{referral.referralCode || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Current Status</label>
            <p className={`text-sm mt-1 font-medium ${getStatusColor(referral.status)}`}>
              {getStatusLabel(referral.status)}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Referrer</label>
            <p className="text-sm text-gray-900 mt-1">{referral.referredBy}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Created Date</label>
            <p className="text-sm text-gray-900 mt-1">{referral.createdDate || referral.date}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};