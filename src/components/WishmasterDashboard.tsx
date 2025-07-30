import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  status: "Completed" | "Delivering" | "Onboarding";
  progress: number;
  amount: number;
  location?: string;
  referralDate: string;
}

const mockReferrals: Referral[] = [
  {
    id: "1",
    name: "Amit Sharma",
    phone: "9876543211",
    status: "Completed",
    progress: 100,
    amount: 10000,
    location: "TrueFlex",
    referralDate: "12/10/2024"
  },
  {
    id: "2", 
    name: "Deepak Patel",
    phone: "9876543212",
    status: "Delivering",
    progress: 80,
    amount: 5000,
    location: "Kirana",
    referralDate: "12/15/2024"
  },
  {
    id: "3",
    name: "Vikash Singh", 
    phone: "9876543213",
    status: "Onboarding",
    progress: 60,
    amount: 0,
    referralDate: "12/20/2024"
  }
];

export const WishmasterDashboard = () => {
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [showPotentialModal, setShowPotentialModal] = useState(false);
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalReferrals = mockReferrals.length;
  const totalEarnings = mockReferrals.reduce((sum, ref) => sum + ref.amount, 0);
  const potentialEarnings = 15000;
  const badgesEarned = 1;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "Delivering":
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
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground text-primary rounded-lg flex items-center justify-center font-bold">
              W
            </div>
            <span className="text-lg font-semibold">Refer & Earn</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Bell className="h-5 w-5" />
          </Button>
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

      {/* Stats Cards */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowStatsModal(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                  <p className="text-2xl font-bold text-foreground">{totalReferrals}</p>
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
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
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
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                  <p className="text-2xl font-bold text-primary">{badgesEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Badge */}
        <Card className="bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Trophy className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="font-semibold text-warning">First Timer</p>
                <p className="text-sm text-muted-foreground">First successful referral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Referrals Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Your Referrals</h3>
            <p className="text-sm text-muted-foreground">Track the progress of your referrals</p>
          </div>

          <div className="space-y-3">
            {mockReferrals.map((referral) => (
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