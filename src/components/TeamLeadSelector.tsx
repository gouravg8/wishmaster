import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, IndianRupee, Crown, Building } from "lucide-react";

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

interface TeamLeadSelectorProps {
  teamLeads: TeamLead[];
  selectedTeamLead: string;
  onTeamLeadChange: (teamLeadId: string) => void;
  showSystemWide?: boolean;
  onShowSystemWide?: (show: boolean) => void;
}

export const TeamLeadSelector = ({ 
  teamLeads, 
  selectedTeamLead, 
  onTeamLeadChange,
  showSystemWide = false,
  onShowSystemWide
}: TeamLeadSelectorProps) => {
  const totalTeamLeads = teamLeads.length;
  const totalWishmasters = teamLeads.reduce((sum, tl) => sum + tl.wishmasterCount, 0);
  const totalReferrals = teamLeads.reduce((sum, tl) => sum + tl.totalReferrals, 0);
  const totalEarnings = teamLeads.reduce((sum, tl) => sum + tl.totalEarnings, 0);

  return (
    <div className="space-y-4">
      {/* System-wide Overview */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-300">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Crown className="h-5 w-5" />
            System-wide Overview - Admin Control Center
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Building className="h-4 w-4 mr-1" />
              </div>
              <p className="text-2xl font-bold">{totalTeamLeads}</p>
              <p className="text-xs opacity-80">Team Leads</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 mr-1" />
              </div>
              <p className="text-2xl font-bold">{totalWishmasters}</p>
              <p className="text-xs opacity-80">Wishmasters</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 mr-1" />
              </div>
              <p className="text-2xl font-bold">{totalReferrals}</p>
              <p className="text-xs opacity-80">Total Referrals</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <IndianRupee className="h-4 w-4 mr-1" />
              </div>
              <p className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</p>
              <p className="text-xs opacity-80">System Earnings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Controls */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-600 text-white rounded flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <h4 className="font-medium mb-1">Admin Controls</h4>
              </div>
              <p className="text-sm text-muted-foreground">Monitor and manage all Team Leads and their teams</p>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              {onShowSystemWide && (
                <Button
                  variant={showSystemWide ? "default" : "outline"}
                  size="sm"
                  onClick={() => onShowSystemWide(!showSystemWide)}
                  className={`flex-1 sm:flex-none ${
                    showSystemWide 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  🌐 System-wide View
                </Button>
              )}
              
              <Select 
                value={selectedTeamLead} 
                onValueChange={onTeamLeadChange}
                disabled={showSystemWide}
              >
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder="Choose Team Lead" />
                </SelectTrigger>
                <SelectContent>
                  {teamLeads.map((teamLead) => (
                    <SelectItem key={teamLead.id} value={teamLead.id}>
                      <div className="flex items-center gap-2">
                        <span>{teamLead.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {teamLead.region}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {teamLead.wishmasterCount} WMs
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {!showSystemWide && selectedTeamLead && (
            <div className="mt-3 pt-3 border-t">
              {(() => {
                const teamLead = teamLeads.find(tl => tl.id === selectedTeamLead);
                return teamLead ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">{teamLead.name}</span>
                      <span className="text-muted-foreground ml-2">({teamLead.phone})</span>
                      <p className="text-xs text-muted-foreground">Region: {teamLead.region}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{teamLead.totalEarnings.toLocaleString()} earned</p>
                      <p className="text-xs text-muted-foreground">{teamLead.wishmasterCount} Wishmasters</p>
                      <p className="text-xs text-muted-foreground">Joined {teamLead.joiningDate}</p>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};