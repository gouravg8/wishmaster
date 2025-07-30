import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TeamLeadSelector } from "@/components/TeamLeadSelector";
import { WishmasterSelector } from "@/components/WishmasterSelector";
import { ReferralDetailsModal } from "@/components/modals/ReferralDetailsModal";
import { ReferralEditModal } from "@/components/modals/ReferralEditModal";
import { ReferralViewModal } from "@/components/modals/ReferralViewModal";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  TrendingUp,
  Building,
  Menu,
  Bell,
  Settings,
  Calendar,
  Download
} from "lucide-react";

interface AdminReferral {
  id: string;
  refereeName: string;
  refereePhone: string;
  status: "submitted" | "app_downloaded" | "onboarding" | "first_delivery" | "completed";
  progress: number;
  amount: number;
  location?: string;
  referralDate: string;
  lastUpdated: string;
  teamLeadId: string;
  teamLeadName: string;
  wishmasterId: string;
  wishmasterName: string;
  wishmasterPhone: string;
  region: string;
  model?: string;
  reward?: number;
  aadharNumber?: string;
  panNumber?: string;
}

interface TeamLead {
  id: string;
  name: string;
  phone: string;
  wishmasterCount: number;
  totalReferrals: number;
  totalEarnings: number;
  region: string;
  joiningDate: string;
}

interface Wishmaster {
  id: string;
  name: string;
  phone: string;
  totalReferrals: number;
  totalEarnings: number;
  potentialEarnings: number;
  joiningDate: string;
}

// Mock data for Admin view - Complete system overview
const mockTeamLeads: TeamLead[] = [
  {
    id: "tl1",
    name: "Arjun Mehta",
    phone: "9000000001",
    wishmasterCount: 3,
    totalReferrals: 9,
    totalEarnings: 50000,
    region: "North Delhi",
    joiningDate: "Oct 2024"
  },
  {
    id: "tl2", 
    name: "Kavita Singh",
    phone: "9000000002",
    wishmasterCount: 2,
    totalReferrals: 6,
    totalEarnings: 35000,
    region: "South Delhi",
    joiningDate: "Sep 2024"
  }
];

const mockWishmasters: Wishmaster[] = [
  { id: "wm1", name: "Rajesh Kumar", phone: "1000000000", totalReferrals: 3, totalEarnings: 15000, potentialEarnings: 15000, joiningDate: "Nov 2024" },
  { id: "wm2", name: "Priya Sharma", phone: "1000000001", totalReferrals: 4, totalEarnings: 25000, potentialEarnings: 20000, joiningDate: "Oct 2024" },
  { id: "wm3", name: "Amit Patel", phone: "1000000002", totalReferrals: 2, totalEarnings: 10000, potentialEarnings: 10000, joiningDate: "Dec 2024" },
  { id: "wm4", name: "Sunita Verma", phone: "1000000003", totalReferrals: 3, totalEarnings: 20000, potentialEarnings: 18000, joiningDate: "Oct 2024" },
  { id: "wm5", name: "Rohit Jain", phone: "1000000004", totalReferrals: 3, totalEarnings: 15000, potentialEarnings: 15000, joiningDate: "Nov 2024" },
];

const mockAllReferrals: AdminReferral[] = [
  {
    id: "ref1",
    refereeName: "Amit Sharma",
    refereePhone: "9876543211",
    status: "completed",
    progress: 100,
    amount: 10000,
    location: "TrueFlex",
    referralDate: "12/10/2024",
    lastUpdated: "12/25/2024",
    teamLeadId: "tl1",
    teamLeadName: "Arjun Mehta",
    wishmasterId: "wm1",
    wishmasterName: "Rajesh Kumar",
    wishmasterPhone: "1000000000",
    region: "North Delhi",
    model: "TrueFlex",
    reward: 10000,
    aadharNumber: "1234-5678-9012",
    panNumber: "ABCDE1234F"
  },
  {
    id: "ref2",
    refereeName: "Deepak Patel",
    refereePhone: "9876543212",
    status: "first_delivery",
    progress: 80,
    amount: 5000,
    location: "Kirana",
    referralDate: "12/15/2024",
    lastUpdated: "12/28/2024",
    teamLeadId: "tl1",
    teamLeadName: "Arjun Mehta",
    wishmasterId: "wm1",
    wishmasterName: "Rajesh Kumar",
    wishmasterPhone: "1000000000",
    region: "North Delhi",
    model: "Kirana",
    reward: 10000
  },
  {
    id: "ref3",
    refereeName: "Priya Singh",
    refereePhone: "9876543213",
    status: "onboarding",
    progress: 60,
    amount: 0,
    referralDate: "12/20/2024",
    lastUpdated: "12/26/2024",
    teamLeadId: "tl1",
    teamLeadName: "Arjun Mehta",
    wishmasterId: "wm2",
    wishmasterName: "Priya Sharma",
    wishmasterPhone: "1000000001",
    region: "North Delhi",
    model: "TrueFlex",
    reward: 10000
  },
  {
    id: "ref4",
    refereeName: "Sunita Devi",
    refereePhone: "9876543214",
    status: "completed",
    progress: 100,
    amount: 10000,
    location: "TrueFlex",
    referralDate: "12/05/2024",
    lastUpdated: "12/20/2024",
    teamLeadId: "tl2",
    teamLeadName: "Kavita Singh",
    wishmasterId: "wm4",
    wishmasterName: "Sunita Verma",
    wishmasterPhone: "1000000003",
    region: "South Delhi",
    model: "TrueFlex",
    reward: 10000,
    aadharNumber: "2345-6789-0123",
    panNumber: "FGHIJ5678K"
  },
  {
    id: "ref5",
    refereeName: "Ravi Kumar",
    refereePhone: "9876543215",
    status: "app_downloaded",
    progress: 40,
    amount: 0,
    referralDate: "12/22/2024",
    lastUpdated: "12/27/2024",
    teamLeadId: "tl2",
    teamLeadName: "Kavita Singh",
    wishmasterId: "wm5",
    wishmasterName: "Rohit Jain",
    wishmasterPhone: "1000000004",
    region: "South Delhi",
    model: "Kirana",
    reward: 10000
  }
];

const AdminReferrals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [selectedTeamLead, setSelectedTeamLead] = useState<string | null>(null);
  const [selectedWishmaster, setSelectedWishmaster] = useState<string | null>(null);
  const [showSystemWide, setShowSystemWide] = useState(true);
  const [showAggregated, setShowAggregated] = useState(true);
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<AdminReferral | null>(null);

  // Filter referrals based on selections
  const filteredReferrals = mockAllReferrals.filter(referral => {
    const matchesSearch = referral.refereeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.refereePhone.includes(searchTerm) ||
                         referral.wishmasterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.teamLeadName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || referral.status === statusFilter;
    const matchesRegion = regionFilter === "all" || referral.region === regionFilter;
    const matchesTeamLead = !selectedTeamLead || referral.teamLeadId === selectedTeamLead;
    const matchesWishmaster = !selectedWishmaster || referral.wishmasterId === selectedWishmaster;
    
    return matchesSearch && matchesStatus && matchesRegion && matchesTeamLead && matchesWishmaster;
  });

  // Calculate stats
  const totalReferrals = filteredReferrals.length;
  const completedReferrals = filteredReferrals.filter(r => r.status === "completed").length;
  const totalEarnings = filteredReferrals.reduce((sum, r) => sum + r.amount, 0);
  const avgProgress = filteredReferrals.reduce((sum, r) => sum + r.progress, 0) / (totalReferrals || 1);

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
    const colorMap = {
      submitted: "bg-blue-100 text-blue-800",
      app_downloaded: "bg-purple-100 text-purple-800",
      onboarding: "bg-yellow-100 text-yellow-800", 
      first_delivery: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800"
    };
    return colorMap[status as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-background relative">
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
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-red-600 rounded-lg flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <span className="text-lg font-semibold">Admin Referrals</span>
                <div className="text-xs opacity-80">System-wide Referral Management</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Download className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Team Lead Selector */}
          <TeamLeadSelector
            teamLeads={mockTeamLeads}
            selectedTeamLead={selectedTeamLead}
            onTeamLeadChange={setSelectedTeamLead}
            showSystemWide={showSystemWide}
            onShowSystemWide={setShowSystemWide}
          />

          {/* Wishmaster Selector - only show when Team Lead is selected */}
          {selectedTeamLead && !showSystemWide && (
            <WishmasterSelector
              wishmasters={mockWishmasters.filter(wm => 
                // Filter wishmasters based on selected team lead
                selectedTeamLead === "tl1" ? ["wm1", "wm2", "wm3"].includes(wm.id) :
                selectedTeamLead === "tl2" ? ["wm4", "wm5"].includes(wm.id) : false
              )}
              selectedWishmaster={selectedWishmaster}
              onWishmasterChange={setSelectedWishmaster}
              showAggregated={showAggregated}
              onShowAggregated={setShowAggregated}
            />
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Referrals</p>
                    <p className="text-2xl font-bold text-blue-600">{totalReferrals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedReferrals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                    <p className="text-2xl font-bold text-orange-600">{Math.round(avgProgress)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold text-purple-600">₹{totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search referrals, wishmasters, team leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="app_downloaded">App Downloaded</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="first_delivery">First Delivery</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger>
                    <Building className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="North Delhi">North Delhi</SelectItem>
                    <SelectItem value="South Delhi">South Delhi</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setRegionFilter("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Referrals Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Referrals Management ({filteredReferrals.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Referee</TableHead>
                      <TableHead>Wishmaster</TableHead>
                      <TableHead>Team Lead</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReferrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {referral.refereeName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{referral.refereeName}</p>
                              <p className="text-xs text-muted-foreground">{referral.refereePhone}</p>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{referral.wishmasterName}</p>
                            <p className="text-xs text-muted-foreground">{referral.wishmasterPhone}</p>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{referral.teamLeadName}</p>
                            <p className="text-xs text-muted-foreground">{referral.region}</p>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Badge className={getStatusColor(referral.status)}>
                            {getStatusLabel(referral.status)}
                          </Badge>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{referral.progress}%</span>
                            </div>
                            <Progress value={referral.progress} className="h-2 w-16" />
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <p className="font-medium text-green-600">
                            {referral.amount > 0 ? `₹${referral.amount.toLocaleString()}` : "-"}
                          </p>
                        </TableCell>
                        
                        <TableCell>
                          <p className="text-sm">{referral.referralDate}</p>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedReferral(referral);
                                setViewModalOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedReferral(referral);
                                setEditModalOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        <ReferralViewModal
          open={viewModalOpen}
          onOpenChange={setViewModalOpen}
          referral={selectedReferral ? {
            id: selectedReferral.id,
            refereeName: selectedReferral.refereeName,
            refereePhone: selectedReferral.refereePhone,
            referredBy: selectedReferral.wishmasterName,
            status: selectedReferral.status,
            model: (selectedReferral.model || "TrueFlex") as "TrueFlex" | "Kirana",
            reward: selectedReferral.reward || 10000,
            date: selectedReferral.referralDate,
            panNumber: selectedReferral.panNumber,
            aadhaarNumber: selectedReferral.aadharNumber
          } : null}
        />
        
        <ReferralEditModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          referral={selectedReferral ? {
            id: selectedReferral.id,
            refereeName: selectedReferral.refereeName,
            refereePhone: selectedReferral.refereePhone,
            referredBy: selectedReferral.wishmasterName,
            status: selectedReferral.status,
            model: (selectedReferral.model || "TrueFlex") as "TrueFlex" | "Kirana",
            reward: selectedReferral.reward || 10000,
            date: selectedReferral.referralDate,
            panNumber: selectedReferral.panNumber,
            aadhaarNumber: selectedReferral.aadharNumber
          } : null}
          onSave={(updatedReferral) => {
            console.log("Saving referral:", updatedReferral);
            setEditModalOpen(false);
          }}
        />
        
        <ReferralDetailsModal
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          referral={selectedReferral ? {
            id: selectedReferral.id,
            name: selectedReferral.refereeName,
            phone: selectedReferral.refereePhone,
            status: selectedReferral.status as any,
            progress: selectedReferral.progress,
            amount: selectedReferral.amount,
            referralDate: selectedReferral.referralDate,
          } : null}
        />
      </div>
    </div>
  );
};

export default AdminReferrals;