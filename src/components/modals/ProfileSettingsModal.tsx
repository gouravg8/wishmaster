import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { X, Edit } from "lucide-react";

interface ProfileSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileSettingsModal = ({ open, onOpenChange }: ProfileSettingsModalProps) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  // Mock admin profile data
  const adminProfile = {
    fullName: "Admin User",
    email: "admin.user@company.com",
    phoneNumber: "+91 7654321098",
    address: "Bangalore, Karnataka",
    profileId: "ADM001",
    casperId: "CSP0003",
    role: "Sorter",
    joinDate: "1/15/2024",
    totalDeliveries: "0",
    status: "Active",
    panNumber: "ABCDE1234F",
    aadhaarNumber: "1234-5678-9012",
    bankAccount: "****1234",
    ifscCode: "HDFC0001234"
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked - redirecting to login");
    onOpenChange(false);
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-11/12 rounded-md max-h-[90vh] overflow-y-auto bg-white opacity-100">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
              👤
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">Profile Settings</DialogTitle>
              {/* <p className="text-sm text-muted-foreground">Manage your account information</p> */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditMode(!editMode)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                👤
              </div>
              <h3 className="font-semibold text-gray-900">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={adminProfile.fullName}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  value={adminProfile.email}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={adminProfile.phoneNumber}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Address
                </Label>
                <Input
                  id="address"
                  value={adminProfile.address}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Work Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                💼
              </div>
              <h3 className="font-semibold text-gray-900">Work Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profileId" className="text-sm font-medium text-gray-700">
                  Profile ID
                </Label>
                <Input
                  id="profileId"
                  value={adminProfile.profileId}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="casperId" className="text-sm font-medium text-gray-700">
                  Casper ID
                </Label>
                <Input
                  id="casperId"
                  value={adminProfile.casperId}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role
                </Label>
                <Input
                  id="role"
                  value={adminProfile.role}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="joinDate" className="text-sm font-medium text-gray-700">
                  Join Date
                </Label>
                <Input
                  id="joinDate"
                  value={adminProfile.joinDate}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="totalDeliveries" className="text-sm font-medium text-gray-700">
                  Total Deliveries
                </Label>
                <Input
                  id="totalDeliveries"
                  value={adminProfile.totalDeliveries}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <div className="mt-1">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {adminProfile.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Document Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
                📄
              </div>
              <h3 className="font-semibold text-gray-900">Document Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="panNumber" className="text-sm font-medium text-gray-700">
                  PAN Number
                </Label>
                <Input
                  id="panNumber"
                  value={adminProfile.panNumber}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="aadhaarNumber" className="text-sm font-medium text-gray-700">
                  Aadhaar Number
                </Label>
                <Input
                  id="aadhaarNumber"
                  value={adminProfile.aadhaarNumber}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bankAccount" className="text-sm font-medium text-gray-700">
                  Bank Account
                </Label>
                <Input
                  id="bankAccount"
                  value={adminProfile.bankAccount}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ifscCode" className="text-sm font-medium text-gray-700">
                  IFSC Code
                </Label>
                <Input
                  id="ifscCode"
                  value={adminProfile.ifscCode}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 gap-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};