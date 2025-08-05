import { useEffect, useState } from "react";
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
  Bell,
  FileIcon
} from "lucide-react";
import * as LucideIcons from 'lucide-react';
import { getMyReferrals, getMyStats } from "@/services/ReferalService";
import { useQuery } from "@tanstack/react-query";

type ProgressStage = {
  id: string;
  stage: number;
  name: string;
  description: string;
  completed: boolean;
};

type UserReferral = {
  id: string;
  name: string;
  phone: string;
  reward: string;
  Progress: ProgressStage[];
};

type Stats = {
  totalReffered: number;
  totalEarnings: number;
  potentialEarnings: number;
  badgesEarned: number;
}

const demoStats: Stats = { totalReffered: 7, totalEarnings: 3999, potentialEarnings: 3333, badgesEarned: 4 };


const demoStatData = [
  {
    icon: "User",
    color: "primary",
    label: "Total Referrals",
    value: demoStats?.totalReffered
  },
  {
    icon: "IndianRupee",
    color: "success",
    label: "Total Earnings",
    value: demoStats?.totalEarnings
  },
  {
    icon: "TrendingUp",
    color: "warning",
    label: "Potential",
    value: demoStats?.potentialEarnings
  },
  {
    icon: "Trophy",
    color: "primary",
    label: "Badges Earned",
    value: demoStats?.badgesEarned
  },
]

export const WishmasterDashboard = () => {
  const [selectedReferral, setSelectedReferral] = useState<UserReferral | null>(null);
  const [showPotentialModal, setShowPotentialModal] = useState(false);
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const potentialEarnings = 15000;
  const badgesEarned = 1;



  const getStatusColor = (status: string) => {
    switch (status) {
      case "Referral Submitted":
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

  const { data: myStatsData, isError: isMyStatsError, error: myStatsError } = useQuery({
    queryKey: ["my-stats"],
    queryFn: async () => await getMyStats(),
    retry: false
  })

  const { data: myReferralsData, isError: isMyReferralsError, error: myReferralsError } = useQuery({
    queryKey: ["my-referrals"],
    queryFn: async () => await getMyReferrals(),
    retry: false
  })

  if (myReferralsData) {
    console.log({ myReferralsData });

  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 font-bold rounded-lg bg-primary-foreground text-primary">
                W
              </div>
              <span className="text-lg font-semibold">Wish Master</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Bell className="w-5 h-5" />
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
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="container max-w-6xl p-4 px-4 py-8 mx-auto space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {demoStatData?.map(stat => {
              const IconComponent = LucideIcons[stat.icon];
              return (<Card
                className={`transition-shadow shadow-sm bg-card`}
              // cursor-pointer hover:shadow-md
              // onClick={() => setShowEarningsModal(true)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${stat?.color}/10`}>
                      <IconComponent className={`w-5 h-5 text-${stat?.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat?.label}</p>
                      <p className={`text-2xl font-bold text-${stat?.color}`}>₹{stat?.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              )
            }
            )}
          </div>

          {/* Achievement Badge */}
          <Card className="bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Trophy className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-warning">First Timer</p>
                  <p className="text-xs text-muted-foreground">First successful referral</p>
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

            {(!myReferralsData?.data?.data?.length || isMyReferralsError) ?
              < Card className="flex flex-col items-center justify-center p-6 mx-auto text-center">
                <FileIcon className="w-12 h-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Referrals Available</h3>
                <p className="text-sm text-muted-foreground">Try Referring the service with some people</p>
              </Card>
              :
              <div className="grid max-h-screen grid-cols-1 gap-4 overflow-y-scroll md:grid-cols-3">
                {myReferralsData?.data?.data?.map((referral: UserReferral) => (
                  <Card key={referral.id} className="py-3 shadow-sm bg-card">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-11">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {referral.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{`${referral?.name[0]?.toUpperCase()}${referral?.name?.slice(1)}`}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>📞 {referral.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(referral?.Progress[0]?.name)}>
                            {referral?.Progress[0]?.name}
                          </Badge>
                          {referral?.Progress[0]?.stage > 0 && (
                            <p className="mt-2 text-sm font-semibold text-success">
                              ₹{referral?.reward?.toLocaleString()} paid
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{referral?.Progress[0]?.stage}%</span>
                        </div>
                        <Progress value={referral?.Progress[0]?.stage} className="h-2" />
                      </div>

                      {/* <div className="flex items-center justify-between pt-4 mt-3 border-t border-border">
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
                        className="text-primary hover:text-primary hover:bg-primary/9"
                      >
                        <Eye className="w-5 h-4 mr-1" />
                        View Details
                      </Button>
                    </div> */}
                    </CardContent>
                  </Card>
                ))}
              </div>

            }
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

        {/* <ReferralDetailsModal
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
          referral={selectedReferral}
        /> */}

        <ProfileSettingsModal
          open={showProfileModal}
          onOpenChange={setShowProfileModal}
        />
      </div>
    </div >
  );
};