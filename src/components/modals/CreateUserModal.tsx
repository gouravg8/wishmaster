import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateUser: (userData: UserData) => void;
}

interface UserData {
  fullName: string;
  phoneNumber: string;
  role: string;
  profileId: string;
}

export const CreateUserModal = ({ open, onOpenChange, onCreateUser }: CreateUserModalProps) => {
  const [formData, setFormData] = useState<UserData>({
    fullName: "",
    phoneNumber: "",
    role: "Wishmaster",
    profileId: ""
  });

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.fullName && formData.phoneNumber && formData.role) {
      onCreateUser(formData);
      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        role: "Wishmaster",
        profileId: ""
      });
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      fullName: "",
      phoneNumber: "",
      role: "Wishmaster",
      profileId: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Create New User Login
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input 
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input 
              placeholder="10-digit mobile number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <Select 
              value={formData.role} 
              onValueChange={(value) => handleInputChange('role', value)}
            >
              <SelectTrigger className="w-full bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                <SelectItem value="Wishmaster">Wishmaster</SelectItem>
                <SelectItem value="Team Lead">Team Lead</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile ID
            </label>
            <Input 
              placeholder="Auto-generated or custom"
              value={formData.profileId}
              onChange={(e) => handleInputChange('profileId', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
            disabled={!formData.fullName || !formData.phoneNumber || !formData.role}
          >
            Create User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};