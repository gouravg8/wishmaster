import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";

interface ReferralFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReferralFormModal = ({ open, onOpenChange }: ReferralFormModalProps) => {
  const [selectedModel, setSelectedModel] = useState<"trueflex" | "kirana" | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    panNumber: "",
    aadhaarNumber: ""
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted:", { ...formData, model: selectedModel });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center gap-3 pb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onOpenChange(false)}
            className="p-1 h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <DialogTitle className="text-xl font-semibold">Refer a Friend</DialogTitle>
            <p className="text-sm text-muted-foreground">Fill in the details to make a referral</p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">
                1
              </div>
              <h3 className="font-medium">Personal Information</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="mobileNumber" className="text-sm font-medium">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Work Preference */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">
                2
              </div>
              <h3 className="font-medium">Work Preference</h3>
            </div>
            
            <div>
              <Label className="text-sm font-medium">
                Select Model <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Card 
                  className={`p-3 cursor-pointer transition-all ${
                    selectedModel === "trueflex" 
                      ? "ring-2 ring-blue-600 bg-blue-50" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedModel("trueflex")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">TrueFlex</p>
                      <p className="text-xs text-muted-foreground">Flexible working hours</p>
                    </div>
                    {selectedModel === "trueflex" && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </Card>
                
                <Card 
                  className={`p-3 cursor-pointer transition-all ${
                    selectedModel === "kirana" 
                      ? "ring-2 ring-blue-600 bg-blue-50" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedModel("kirana")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Kirana</p>
                      <p className="text-xs text-muted-foreground">Local deliveries</p>
                    </div>
                    {selectedModel === "kirana" && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Document Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">
                3
              </div>
              <h3 className="font-medium">Document Details</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="panNumber" className="text-sm font-medium">
                  PAN Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="panNumber"
                  placeholder="ABCDE1234F"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange("panNumber", e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="aadhaarNumber" className="text-sm font-medium">
                  Aadhaar Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="aadhaarNumber"
                  placeholder="1234-5678-9012"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange("aadhaarNumber", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              ✓ Submit Referral
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};