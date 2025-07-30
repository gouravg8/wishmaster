import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

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

interface ReferralEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referral: AdminReferral | null;
  onSave: (referral: AdminReferral) => void;
}

export const ReferralEditModal = ({ open, onOpenChange, referral, onSave }: ReferralEditModalProps) => {
  const [formData, setFormData] = useState<AdminReferral>({
    id: "",
    refereeName: "",
    refereePhone: "",
    referredBy: "",
    status: "submitted",
    model: "TrueFlex",
    reward: 0,
    date: "",
    panNumber: "",
    aadhaarNumber: "",
    referralCode: "",
    createdDate: ""
  });

  useEffect(() => {
    if (referral) {
      setFormData(referral);
    }
  }, [referral]);

  if (!referral) return null;

  const handleSave = () => {
    onSave(formData);
  };

  const handleInputChange = (field: keyof AdminReferral, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 mx-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-lg font-semibold">
            Edit Referral Details
         </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Referee Name</label>
            <Input 
              value={formData.refereeName}
              onChange={(e) => handleInputChange('refereeName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <Input 
              value={formData.refereePhone}
              onChange={(e) => handleInputChange('refereePhone', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">PAN Number</label>
            <Input 
              value={formData.panNumber || ""}
              onChange={(e) => handleInputChange('panNumber', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Aadhaar Number</label>
            <Input 
              value={formData.aadhaarNumber || ""}
              onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Referral Code</label>
            <Input 
              value={formData.referralCode || ""}
              onChange={(e) => handleInputChange('referralCode', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Current Status</label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleInputChange('status', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="app_downloaded">App Downloaded</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
                <SelectItem value="first_delivery">First Delivery</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Referrer</label>
            <Input 
              value={formData.referredBy}
              onChange={(e) => handleInputChange('referredBy', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Created Date</label>
            <Input 
              value={formData.createdDate || formData.date}
              onChange={(e) => handleInputChange('createdDate', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};