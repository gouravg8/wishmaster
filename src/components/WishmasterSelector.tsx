import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, IndianRupee } from "lucide-react";

interface Wishmaster {
  id: string;
  name: string;
  phone: string;
  totalReferrals: number;
  totalEarnings: number;
  potentialEarnings: number;
  joiningDate: string;
}

interface WishmasterSelectorProps {
  wishmasters: Wishmaster[];
  selectedWishmaster: string;
  onWishmasterChange: (wishmasterId: string) => void;
  showAggregated?: boolean;
  onShowAggregated?: (show: boolean) => void;
}

export const WishmasterSelector = ({
  wishmasters,
  selectedWishmaster,
  onWishmasterChange,
  showAggregated = false,
  onShowAggregated
}: WishmasterSelectorProps) => {
  const totalWishmasters = wishmasters.length;
  const totalReferrals = wishmasters.reduce((sum, wm) => sum + wm.totalReferrals, 0);
  const totalEarnings = wishmasters.reduce((sum, wm) => sum + wm.totalEarnings, 0);
  const totalPotential = wishmasters.reduce((sum, wm) => sum + wm.potentialEarnings, 0);

  return (
    <div className="space-y-4">
      {/* Team Overview Banner */}
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Users className="h-5 w-5" />
        Team Overview - Performance Dashboard
      </h3>

      <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-300">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-8 w-8 mr-2" />
                <p className="text-2xl font-bold">{totalWishmasters}</p>
              </div>
              <p className="text-xs opacity-80">Wishmasters</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-8 w-8 mr-2" />
                <p className="text-2xl font-bold">{totalReferrals}</p>
              </div>
              <p className="text-xs opacity-80">Total Referrals</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <IndianRupee className="h-8 w-8 mr-2" />
                <p className="text-2xl font-bold">{totalEarnings.toLocaleString()}</p>
              </div>
              <p className="text-xs opacity-80">Total Earnings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-8 w-8 mr-2" />
                <p className="text-2xl font-bold">{totalPotential.toLocaleString()}</p>
              </div>
              <p className="text-xs opacity-80">Potential</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Lead Controls */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-600 text-white rounded flex items-center justify-center text-xs font-bold">
                  TL
                </div>
                <h4 className="font-medium mb-1">Team Lead Controls</h4>
              </div>
              <p className="text-sm text-muted-foreground">Manage and monitor your Wishmaster team</p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {onShowAggregated && (
                <Button
                  variant={showAggregated ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    onShowAggregated(!showAggregated)
                    onWishmasterChange("");
                  }}
                  className={`flex-1 sm:flex-none ${showAggregated
                    ? "bg-purple-600 hover:text-white hover:bg-purple-700 text-white"
                    : "border-purple-300 hover:text-purple-600 text-purple-600 hover:bg-purple-50"
                    }`}
                >
                  🏆 All Team Data
                </Button>
              )}

              <Select
                value={selectedWishmaster || ""}
                onValueChange={onWishmasterChange}
                disabled={showAggregated}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Choose Wishmaster" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" disabled>
                    <span className="text-muted-background">Choose Wishmaster</span>
                  </SelectItem>
                  {wishmasters?.map((wishmaster) => (
                    <SelectItem key={wishmaster.id} value={wishmaster.id}>
                      <div className="flex items-center gap-2">
                        <span>{wishmaster.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {wishmaster.totalReferrals} refs
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!showAggregated && selectedWishmaster && (
            <div className="mt-3 pt-3 border-t">
              {(() => {
                const wishmaster = wishmasters.find(w => w.id === selectedWishmaster);
                return wishmaster ? (
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{wishmaster.name}</span>
                      <span className="text-muted-foreground ml-2">({wishmaster.phone})</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{wishmaster.totalEarnings.toLocaleString()} earned</p>
                      <p className="text-xs text-muted-foreground">Joined {wishmaster.joiningDate}</p>
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