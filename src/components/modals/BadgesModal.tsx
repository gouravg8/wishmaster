import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Trophy, Star, Target, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BadgesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BadgesModal = ({ open, onOpenChange }: BadgesModalProps) => {
  const earnedBadges = [
    {
      id: "first-timer",
      name: "First Timer",
      description: "First successful referral",
      icon: Trophy,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      earned: true,
      earnedDate: "12/10/2024"
    }
  ];

  const availableBadges = [
    {
      id: "milestone-5",
      name: "Milestone 5",
      description: "Complete 5 successful referrals",
      icon: Target,
      color: "text-muted-foreground",
      bgColor: "bg-muted/10",
      borderColor: "border-muted/20",
      earned: false,
      progress: "1/5"
    },
    {
      id: "team-builder",
      name: "Team Builder",
      description: "Refer 10 people in a month",
      icon: Users,
      color: "text-muted-foreground",
      bgColor: "bg-muted/10",
      borderColor: "border-muted/20",
      earned: false,
      progress: "3/10"
    },
    {
      id: "top-performer",
      name: "Top Performer",
      description: "Earn ₹50,000 in referrals",
      icon: Star,
      color: "text-muted-foreground",
      bgColor: "bg-muted/10",
      borderColor: "border-muted/20",
      earned: false,
      progress: "₹15,000/₹50,000"
    },
    {
      id: "bonus-hunter",
      name: "Bonus Hunter",
      description: "Complete 3 referrals in a week",
      icon: Gift,
      color: "text-muted-foreground",
      bgColor: "bg-muted/10",
      borderColor: "border-muted/20",
      earned: false,
      progress: "1/3"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-md mx-auto max-h-[90vh] overflow-y-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Your Badges
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Earned Badges */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-warning" />
              Earned Badges ({earnedBadges.length})
            </h4>
            
            <div className="space-y-3">
              {earnedBadges.map((badge) => {
                const IconComponent = badge.icon;
                return (
                  <Card key={badge.id} className={`${badge.bgColor} ${badge.borderColor} border-2`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${badge.bgColor} rounded-lg`}>
                          <IconComponent className={`h-6 w-6 ${badge.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{badge.name}</p>
                            <Badge className="bg-success text-success-foreground">Earned</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {badge.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Earned on {badge.earnedDate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Available Badges */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              Available Badges ({availableBadges.length})
            </h4>
            
            <div className="space-y-3">
              {availableBadges.map((badge) => {
                const IconComponent = badge.icon;
                return (
                  <Card key={badge.id} className={`${badge.bgColor} ${badge.borderColor}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${badge.bgColor} rounded-lg`}>
                          <IconComponent className={`h-6 w-6 ${badge.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-muted-foreground">{badge.name}</p>
                            <Badge variant="outline" className="text-muted-foreground">
                              {badge.progress}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-semibold text-primary mb-1">
                Keep Going!
              </p>
              <p className="text-sm text-muted-foreground">
                Complete more referrals to unlock amazing badges and rewards!
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};