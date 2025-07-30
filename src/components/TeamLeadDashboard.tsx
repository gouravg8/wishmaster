import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { WishmasterSelector } from "./WishmasterSelector";
import { PotentialEarningsModal } from "./modals/PotentialEarningsModal";
import { EarningsBreakdownModal } from "./modals/EarningsBreakdownModal";
import { ReferralStatsModal } from "./modals/ReferralStatsModal";
import { ReferralDetailsModal } from "./modals/ReferralDetailsModal";
import { BadgesModal } from "./modals/BadgesModal";
import { ProfileSettingsModal } from "./modals/ProfileSettingsModal";
import { AppSidebar } from "./AppSidebar";
import { 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Trophy,
  Eye,
  Settings,
  Menu,
  Bell
} from "lucide-react";

interface Referral {
  id: string;
  name: string;
  phone: string;
  status: "Completed" | "Started Delivering" | "Onboarding";
  progress: number;
  amount: number;
  location?: string;
  referralDate: string;
  wishmasterId: string;
  wishmasterName: string;
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

// Mock data for multiple Wishmasters and their referrals
const mockWishmasters: Wishmaster[] = [
  {
    id: "wm1",
    name: "Rajesh Kumar",
    phone: "1000000000",
    totalReferrals: 3,
    totalEarnings: 15000,
    potentialEarnings: 15000,
    joiningDate: "Nov 2024"
  },
  {
    id: "wm2", 
    name: "Priya Sharma",
    phone: "1000000001",
    totalReferrals: 4,
    totalEarnings: 25000,
    potentialEarnings: 20000,
    joiningDate: "Oct 2024"
  },
  {
    id: "wm3",
    name: "Amit Patel",
    phone: "1000000002", 
    totalReferrals: 2,
    totalEarnings: 10000,
    potentialEarnings: 10000,
    joiningDate: "Dec 2024"
  }
];

const mockAllReferrals: Referral[] = [
  // Rajesh Kumar's referrals
  {
    id: "1",
    name: "Amit Sharma",
    phone: "9876543211",
    status: "Completed",
    progress: 100,
    amount: 10000,
    location: "TrueFlex",
    referralDate: "12/10/2024",
    wishmasterId: "wm1",
    wishmasterName: "Rajesh Kumar"
  },
  {
    id: "2", 
    name: "Deepak Patel",
    phone: "9876543212",
    status: "Started Delivering",
    progress: 80,
    amount: 5000,
    location: "Kirana",
    referralDate: "12/15/2024",
    wishmasterId: "wm1",
    wishmasterName: "Rajesh Kumar"
  },
  {
    id: "3",
    name: "Vikash Singh", 
    phone: "9876543213",
    status: "Onboarding",
    progress: 60,
    amount: 0,
    referralDate: "12/20/2024",
    wishmasterId: "wm1",
    wishmasterName: "Rajesh Kumar"
  },
  // Priya Sharma's referrals
  {
    id: "4",
    name: "Sunita Devi",
    phone: "9876543214",
    status: "Completed",
    progress: 100,
    amount: 10000,
    location: "TrueFlex",
    referralDate: "12/05/2024",
    wishmasterId: "wm2",
    wishmasterName: "Priya Sharma"
  },
  {
    id: "5",
    name: "Ravi Kumar",
    phone: "9876543215",
    status: "Completed",
    progress: 100,
    amount: 10000,
    location: "Kirana",
    referralDate: "12/08/2024",
    wishmasterId: "wm2",
    wishmasterName: "Priya Sharma"
  },
  {
    id: "6",
    name: "Anjali Singh",
    phone: "9876543216",
    status: "Started Delivering",
    progress: 80,
    amount: 5000,
    location: "TrueFlex",
    referralDate: "12/18/2024",
    wishmasterId: "wm2",
    wishmasterName: "Priya Sharma"
  },
  {
    id: "7",
    name: "Mohan Gupta",
    phone: "9876543217",
    status: "Onboarding",
    progress: 40,
    amount: 0,
    referralDate: "12/22/2024",
    wishmasterId: "wm2",
    wishmasterName: "Priya Sharma"
  },
  // Amit Patel's referrals
  {
    id: "8",
    name: "Neha Verma",
    phone: "9876543218",
    status: "Completed",
    progress: 100,
    amount: 10000,
    location: "Kirana",
    referralDate: "12/12/2024",
    wishmasterId: "wm3",
    wishmasterName: "Amit Patel"
  },
  {
    id: "9",
    name: "Rohit Jain",
    phone: "9876543219",
    status: "Onboarding",
    progress: 30,
    amount: 0,
    referralDate: "12/25/2024",
    wishmasterId: "wm3",
    wishmasterName: "Amit Patel"
  }
];

export const TeamLeadDashboard = () => {
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [showPotentialModal, setShowPotentialModal] = useState(false);
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedWishmaster, setSelectedWishmaster] = useState<string>(mockWishmasters[0].id);
  const [showAggregated, setShowAggregated] = useState(false);

  // Filter referrals based on selected Wishmaster or show all if aggregated
  const filteredReferrals = showAggregated 
    ? mockAllReferrals 
    : mockAllReferrals.filter(ref => ref.wishmasterId === selectedWishmaster);

  // Calculate stats based on filtered referrals
  const totalReferrals = filteredReferrals.length;
  const totalEarnings = filteredReferrals.reduce((sum, ref) => sum + ref.amount, 0);
  const potentialEarnings = showAggregated 
    ? mockWishmasters.reduce((sum, wm) => sum + wm.potentialEarnings, 0)
    : mockWishmasters.find(wm => wm.id === selectedWishmaster)?.potentialEarnings || 0;
  const badgesEarned = showAggregated ? 5 : 1; // Mock badges data

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "Started Delivering":
        return "bg-warning text-warning-foreground";
      case "Onboarding":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header - Team Lead Specific Styling */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center justify-between">
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
              <div className="w-8 h-8 bg-white text-purple-600 rounded-lg flex items-center justify-center font-bold">
                TL
              </div>
              <div>
                <span className="text-lg font-semibold">Team Lead Dashboard</span>
                <div className="text-xs opacity-80">Managing Team Performance</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => {
                console.log("Settings button clicked!");
                setShowProfileModal(true);
              }}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 space-y-4">
          {/* Wishmaster Selector */}
          <WishmasterSelector
            wishmasters={mockWishmasters}
            selectedWishmaster={selectedWishmaster}
            onWishmasterChange={setSelectedWishmaster}
            showAggregated={showAggregated}
            onShowAggregated={setShowAggregated}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card 
              className="bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setShowStatsModal(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {showAggregated ? "Total Referrals" : "Referrals"}
                    </p>
                    <p className="text-2xl font-bold text-purple-600">{totalReferrals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setShowEarningsModal(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <IndianRupee className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {showAggregated ? "Total Earnings" : "Earnings"}
                    </p>
                    <p className="text-2xl font-bold text-success">₹{totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setShowPotentialModal(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Potential</p>
                    <p className="text-2xl font-bold text-warning">₹{potentialEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setShowBadgesModal(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Trophy className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Badges Earned</p>
                    <p className="text-2xl font-bold text-purple-600">{badgesEarned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Badge */}
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-200 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <p className="font-semibold text-purple-700 flex items-center gap-2">
                    👑 {showAggregated ? "Team Leader" : "Supervising Performance"}
                  </p>
                  <p className="text-sm text-purple-600">
                    {showAggregated ? `Managing ${mockWishmasters.length} Wishmasters` : "Monitoring individual performance"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referrals Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {showAggregated ? "All Team Referrals" : "Referrals"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {showAggregated ? "Track all team progress" : "Track the progress of referrals"}
              </p>
            </div>

            <div className="space-y-3">
              {filteredReferrals.map((referral) => (
                <Card key={referral.id} className="bg-card shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {referral.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{referral.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>📞 {referral.phone}</span>
                            {referral.location && <span>• {referral.location}</span>}
                            {showAggregated && (
                              <span>• by {referral.wishmasterName}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(referral.status)}>
                          {referral.status}
                        </Badge>
                        {referral.amount > 0 && (
                          <p className="text-sm font-semibold text-success mt-1">
                            ₹{referral.amount.toLocaleString()} paid
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{referral.progress}%</span>
                      </div>
                      <Progress value={referral.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        📅 Referred {referral.referralDate}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedReferral(referral);
                          setShowDetailsModal(true);
                        }}
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Modals */}
        <PotentialEarningsModal 
          open={showPotentialModal} 
          onOpenChange={setShowPotentialModal} 
        />
        
        <EarningsBreakdownModal 
          open={showEarningsModal} 
          onOpenChange={setShowEarningsModal} 
        />
        
        <ReferralStatsModal 
          open={showStatsModal} 
          onOpenChange={setShowStatsModal} 
        />
        
        <BadgesModal 
          open={showBadgesModal} 
          onOpenChange={setShowBadgesModal} 
        />
        
        <ReferralDetailsModal 
          open={showDetailsModal} 
          onOpenChange={setShowDetailsModal} 
          referral={selectedReferral}
        />
        
        <ProfileSettingsModal 
          open={showProfileModal} 
          onOpenChange={setShowProfileModal} 
        />
      </div>
    </div>
  );
};