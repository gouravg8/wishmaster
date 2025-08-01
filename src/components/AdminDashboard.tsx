import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AppSidebar } from "./AppSidebar";
import { ReferralViewModal } from "./modals/ReferralViewModal";
import { ReferralEditModal } from "./modals/ReferralEditModal";
import { CreateUserModal } from "./modals/CreateUserModal";
import { BulkUploadModal } from "./modals/BulkUploadModal";
import { ProfileSettingsModal } from "./modals/ProfileSettingsModal";
import {
  Users,
  Clock,
  CheckCircle,
  IndianRupee,
  TrendingUp,
  Calendar,
  Search,
  Plus,
  Upload,
  Download,
  Menu,
  Bell,
  Settings,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminReferral {
  id: string;
  refereeName: string;
  refereePhone: string;
  referredBy: string;
  status: "submitted" | "app_downloaded" | "onboarding" | "first_delivery" | "completed";
  model: "TrueFlex" | "Kirana";
  reward: number;
  date: string;
  selected?: boolean;
  panNumber?: string;
  aadhaarNumber?: string;
  referralCode?: string;
  createdDate?: string;
}

const mockAdminReferrals: AdminReferral[] = [
  {
    id: "1",
    refereeName: "Amit Sharma",
    refereePhone: "9876543211",
    referredBy: "Rahul Kumar",
    status: "completed",
    model: "TrueFlex",
    reward: 10000,
    date: "12/10/2024",
    panNumber: "ABCDE1234F",
    aadhaarNumber: "1234-5678-9012",
    referralCode: "REF001",
    createdDate: "12/10/2024, 3:30:00 PM"
  },
  {
    id: "2",
    refereeName: "Deepak Patel",
    refereePhone: "9876543212",
    referredBy: "Rahul Kumar",
    status: "first_delivery",
    model: "Kirana",
    reward: 5000,
    date: "12/15/2024",
    panNumber: "FGHIJ5678K",
    aadhaarNumber: "5678-9012-3456",
    referralCode: "REF002",
    createdDate: "12/15/2024, 2:15:00 PM"
  },
  {
    id: "3",
    refereeName: "Vikash Singh",
    refereePhone: "9876543213",
    referredBy: "Rahul Kumar",
    status: "onboarding",
    model: "TrueFlex",
    reward: 0,
    date: "12/20/2024",
    panNumber: "KLMNO9012P",
    aadhaarNumber: "9012-3456-7890",
    referralCode: "REF003",
    createdDate: "12/20/2024, 10:45:00 AM"
  },
  {
    id: "4",
    refereeName: "Rajesh Kumar",
    refereePhone: "9876543214",
    referredBy: "Priya Singh",
    status: "first_delivery",
    model: "TrueFlex",
    reward: 5000,
    date: "12/18/2024",
    panNumber: "QRSTU3456V",
    aadhaarNumber: "3456-7890-1234",
    referralCode: "REF004",
    createdDate: "12/18/2024, 4:20:00 PM"
  }
];

export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [referrals, setReferrals] = useState<AdminReferral[]>(mockAdminReferrals);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [bulkUploadModalOpen, setBulkUploadModalOpen] = useState(false);
  const [profileSettingsModalOpen, setProfileSettingsModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<AdminReferral | null>(null);
  const { toast } = useToast();

  // Calculate stats
  const totalReferrals = referrals.length;
  const pendingReferrals = referrals.filter(r => !["completed"].includes(r.status)).length;
  const completedReferrals = referrals.filter(r => r.status === "completed").length;
  const totalPayout = referrals.reduce((sum, r) => sum + r.reward, 0);
  const conversionRate = totalReferrals > 0 ? ((completedReferrals / totalReferrals) * 100) : 0;

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
        return "bg-green-100 text-green-700 border-green-200";
      case "first_delivery":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "onboarding":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "app_downloaded":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "submitted":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.refereeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.refereePhone.includes(searchTerm) ||
      referral.referredBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || referral.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    setReferrals(referrals.map(r => ({ ...r, selected: checked })));
  };

  const handleSelectReferral = (id: string, checked: boolean) => {
    setReferrals(referrals.map(r =>
      r.id === id ? { ...r, selected: checked } : r
    ));
  };

  const selectedCount = referrals.filter(r => r.selected).length;

  const handleViewReferral = (referral: AdminReferral) => {
    setSelectedReferral(referral);
    setViewModalOpen(true);
  };

  const handleEditReferral = (referral: AdminReferral) => {
    setSelectedReferral(referral);
    setEditModalOpen(true);
  };

  const handleUpdateReferral = (updatedReferral: AdminReferral) => {
    setReferrals(referrals.map(r =>
      r.id === updatedReferral.id ? updatedReferral : r
    ));
    setEditModalOpen(false);
  };

  const handleCreateUser = (userData: any) => {
    console.log("Creating new user:", userData);
    // Here you would typically make an API call to create the user
    // For now, we'll just log the data
  };

  const handleBulkUpload = (file: File) => {
    console.log("Processing bulk upload file:", file.name);
    // Here you would typically process the Excel file and upload the data
    // For now, we'll just log the file info
  };

  const handleBulkStatusUpdate = (newStatus: string) => {
    const selectedIds = referrals.filter(r => r.selected).map(r => r.id);
    const updatedReferrals = referrals.map(r =>
      r.selected ? { ...r, status: newStatus as any, selected: false } : r
    );

    setReferrals(updatedReferrals);

    toast({
      title: "Status Updated",
      description: `Successfully updated ${selectedIds.length} referral(s) to ${getStatusLabel(newStatus)}`,
    });
  };

  const handleClearSelection = () => {
    setReferrals(referrals.map(r => ({ ...r, selected: false })));
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} isAdmin={true} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                A
              </div>
              <span className="text-xl font-semibold text-gray-900">Admin Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:bg-gray-100"
              onClick={() => setProfileSettingsModalOpen(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 container max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{totalReferrals}</div>
                <div className="text-sm text-gray-600">Total Referrals</div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{pendingReferrals}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{completedReferrals}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <IndianRupee className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">₹{totalPayout.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Payout</div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Conversion</div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">12 days</div>
                <div className="text-sm text-gray-600">Avg Time</div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex gap-4 items-center w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-white border-gray-300">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="app_downloaded">App Downloaded</SelectItem>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="first_delivery">First Delivery</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setCreateUserModalOpen(true)}
                icon={<Plus className="h-4 w-4" />}
              >
                Create User
              </Button>
              <Button
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={() => setBulkUploadModalOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Bulk Action Bar */}
          {selectedCount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between mb-6">
              <div className="text-blue-800 font-medium">
                {selectedCount} referral{selectedCount > 1 ? 's' : ''} selected
              </div>
              <div className="flex items-center gap-3">
                <Select onValueChange={handleBulkStatusUpdate}>
                  <SelectTrigger className="w-40 bg-white border-blue-300">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="app_downloaded">App Downloaded</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="first_delivery">First Delivery</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={handleClearSelection}
                  className="border-blue-300 text-blue-600 hover:bg-blue-100"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}

          {/* Data Table */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    All Referrals ({filteredReferrals.length})
                  </h3>
                  <p className="text-sm text-gray-600">Manage and monitor referral progress</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <Checkbox
                          checked={selectedCount === referrals.length && referrals.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referee Details
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referred By
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reward
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReferrals.map((referral) => (
                      <tr key={referral.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <Checkbox
                            checked={referral.selected || false}
                            onCheckedChange={(checked) => handleSelectReferral(referral.id, !!checked)}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{referral.refereeName}</div>
                            <div className="text-sm text-gray-500">{referral.refereePhone}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {referral.referredBy}
                        </td>
                        <td className="px-4 py-4">
                          <Badge className={getStatusColor(referral.status)}>
                            {getStatusLabel(referral.status)}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {referral.model}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {referral.reward > 0 ? (
                            <span className="font-medium text-green-600">
                              ₹{referral.reward.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-gray-400">₹0</span>
                          )}
                          {referral.reward > 0 && (
                            <div className="text-xs text-gray-500">of ₹10,000</div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {referral.date}
                        </td>
                        <td className="px-4 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg z-50">
                              <DropdownMenuItem onClick={() => handleViewReferral(referral)}>
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditReferral(referral)}>
                                Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ReferralViewModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        referral={selectedReferral}
      />
      <ReferralEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        referral={selectedReferral}
        onSave={handleUpdateReferral}
      />
      <CreateUserModal
        open={createUserModalOpen}
        onOpenChange={setCreateUserModalOpen}
        onCreateUser={handleCreateUser}
      />
      <BulkUploadModal
        open={bulkUploadModalOpen}
        onOpenChange={setBulkUploadModalOpen}
        onUpload={handleBulkUpload}
      />
      <ProfileSettingsModal
        open={profileSettingsModalOpen}
        onOpenChange={setProfileSettingsModalOpen}
      />
    </div>
  );
};