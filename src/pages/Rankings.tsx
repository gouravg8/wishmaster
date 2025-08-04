import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/AppSidebar";
import { 
  Menu, 
  Bell, 
  Settings, 
  Trophy,
  Crown,
  Target,
  Users,
  Award
} from "lucide-react";

const Rankings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const topPerformers = [
    {
      rank: 1,
      name: "Priya Singh",
      referrals: 12,
      earnings: 120000,
      badges: 4,
      rankLabel: "Champion"
    },
    {
      rank: 2,
      name: "Rahul Kumar",
      referrals: 8,
      earnings: 80000,
      badges: 3,
      rankLabel: "2nd"
    },
    {
      rank: 3,
      name: "Suresh Patel",
      referrals: 6,
      earnings: 60000,
      badges: 2,
      rankLabel: "3rd"
    }
  ];

  const completeRankings = [
    {
      rank: 1,
      name: "Priya Singh",
      referrals: 12,
      badges: 4,
      earnings: 120000,
      icon: Crown
    },
    {
      rank: 2,
      name: "Rahul Kumar", 
      referrals: 8,
      badges: 3,
      earnings: 80000,
      icon: Award
    },
    {
      rank: 3,
      name: "Suresh Patel",
      referrals: 6,
      badges: 2,
      earnings: 60000,
      icon: Award
    },
    {
      rank: 4,
      name: "Anjali Gupta",
      referrals: 5,
      badges: 2,
      earnings: 50000,
      icon: Award
    },
    {
      rank: 5,
      name: "Vikram Singh",
      referrals: 4,
      badges: 1,
      earnings: 40000,
      icon: Award
    }
  ];

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          cardBg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
          badgeColor: "bg-yellow-500 text-white",
          iconColor: "text-yellow-600"
        };
      case 2:
        return {
          cardBg: "bg-gradient-to-br from-gray-100 to-gray-200",
          badgeColor: "bg-gray-500 text-white",
          iconColor: "text-gray-600"
        };
      case 3:
        return {
          cardBg: "bg-gradient-to-br from-orange-100 to-orange-200",
          badgeColor: "bg-orange-500 text-white",
          iconColor: "text-orange-600"
        };
      default:
        return {
          cardBg: "bg-white",
          badgeColor: "bg-gray-400 text-white",
          iconColor: "text-gray-500"
        };
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
        <div className="sticky top-0 z-40 bg-primary text-primary-foreground p-4 flex items-center justify-between">
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
              <span className="text-lg font-semibold">Wish Master</span>
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
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Rankings Content */}
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Hero Section */}
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Referral Champions</h1>
              <p className="text-lg opacity-90">
                See how you rank against other top performers
              </p>
            </div>
            <div className="absolute top-4 right-4">
              <Trophy className="h-16 w-16 opacity-20" />
            </div>
          </Card>

          {/* Top Performers */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Top Performers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto px-2">
              {topPerformers.map((performer) => {
                const styles = getRankStyles(performer.rank);
                
                return (
                  <Card 
                    key={performer.rank} 
                    className={`${styles.cardBg} border-2 ${
                      performer.rank === 1 ? 'border-yellow-300' : 
                      performer.rank === 2 ? 'border-gray-300' : 'border-orange-300'
                    } relative overflow-hidden w-full`}
                  >
                    <div className="p-4 text-center">
                      <div className="relative mb-3">
                        <div className={`w-12 h-12 ${styles.cardBg} rounded-full flex items-center justify-center mx-auto border-3 ${
                          performer.rank === 1 ? 'border-yellow-400' : 
                          performer.rank === 2 ? 'border-gray-400' : 'border-orange-400'
                        }`}
                        >
                          <Trophy className={`h-6 w-6 ${styles.iconColor}`} />
                        </div>
                        <Badge className={`absolute -top-1 -right-1 ${styles.badgeColor} text-xs font-bold px-2 py-1`}>
                          {performer.rankLabel}
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-base text-gray-800 mb-1">{performer.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">{performer.referrals} referrals</p>
                      <p className="font-semibold text-green-600 text-sm">₹{performer.earnings.toLocaleString()}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Complete Rankings */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Complete Rankings</h2>
              <p className="text-muted-foreground">Updated in real-time</p>
            </div>

            <Card className="max-w-5xl mx-auto overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  {completeRankings.map((performer) => {
                    const IconComponent = performer.icon;
                    
                    return (
                      <div 
                        key={performer.rank}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-lg font-bold text-gray-500 w-5 text-center">
                              {performer.rank}
                            </span>
                            <IconComponent className={`h-5 w-5 ${
                              performer.rank === 1 ? 'text-yellow-600' : 'text-gray-500'
                            }`} />
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 truncate">{performer.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {performer.referrals} referrals
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                {performer.badges} badges
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-green-600 text-sm">₹ {performer.earnings.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Total earned</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Keep Climbing Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 max-w-5xl mx-auto overflow-hidden">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Keep Climbing!</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Make more referrals to climb up the leaderboard and earn exclusive rewards.
              </p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-600 mb-1">Next Goal</p>
                <p className="text-lg font-bold text-blue-600">5 Referrals</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
