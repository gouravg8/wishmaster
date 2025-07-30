import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamLeadSelector } from "@/components/TeamLeadSelector";
import { WishmasterSelector } from "@/components/WishmasterSelector";
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
  TrendingUp,
  Users,
  IndianRupee,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Building,
  Menu,
  Bell,
  Settings,
  Download,
  Filter,
  Clock
} from "lucide-react";
import AnalyticCard from "@/components/custom/AnalyticCard";

interface TeamLead {
  id: string;
  name: string;
  phone: string;
  wishmasterCount: number;
  totalReferrals: number;
  totalEarnings: number;
  region: string;
  joiningDate: string;
  completionRate: number;
  avgTimeToComplete: number; // in days
  topPerformingWishmaster: string;
}

interface Wishmaster {
  id: string;
  name: string;
  phone: string;
  totalReferrals: number;
  totalEarnings: number;
  potentialEarnings: number;
  joiningDate: string;
  completionRate: number;
  avgTimeToComplete: number;
  teamLeadId: string;
  teamLeadName: string;
  region: string;
}

interface RegionPerformance {
  region: string;
  teamLeads: number;
  wishmasters: number;
  totalReferrals: number;
  completedReferrals: number;
  totalEarnings: number;
  completionRate: number;
  avgTimeToComplete: number;
}

interface TimelineData {
  month: string;
  referrals: number;
  completions: number;
  earnings: number;
}

// Mock analytics data
const mockTeamLeads: TeamLead[] = [
  {
    id: "tl1",
    name: "Arjun Mehta",
    phone: "9000000001",
    wishmasterCount: 3,
    totalReferrals: 9,
    totalEarnings: 50000,
    region: "NDL",
    joiningDate: "Oct 2024",
    completionRate: 77.8,
    avgTimeToComplete: 12,
    topPerformingWishmaster: "Priya Sharma"
  },
  {
    id: "tl2",
    name: "Kavita Singh",
    phone: "9000000002",
    wishmasterCount: 2,
    totalReferrals: 6,
    totalEarnings: 35000,
    region: "South Delhi",
    joiningDate: "Sep 2024",
    completionRate: 66.7,
    avgTimeToComplete: 15,
    topPerformingWishmaster: "Sunita Verma"
  }
];

const mockWishmasters: Wishmaster[] = [
  {
    id: "wm1",
    name: "Rajesh Kumar",
    phone: "1000000000",
    totalReferrals: 3,
    totalEarnings: 15000,
    potentialEarnings: 15000,
    joiningDate: "Nov 2024",
    completionRate: 66.7,
    avgTimeToComplete: 10,
    teamLeadId: "tl1",
    teamLeadName: "Arjun Mehta",
    region: "NDL"
  },
  {
    id: "wm2",
    name: "Priya Sharma",
    phone: "1000000001",
    totalReferrals: 4,
    totalEarnings: 25000,
    potentialEarnings: 20000,
    joiningDate: "Oct 2024",
    completionRate: 75.0,
    avgTimeToComplete: 8,
    teamLeadId: "tl1",
    teamLeadName: "Arjun Mehta",
    region: "NDL"
  },
  {
    id: "wm3",
    name: "Amit Patel",
    phone: "1000000002",
    totalReferrals: 2,
    totalEarnings: 10000,
    potentialEarnings: 10000,
    joiningDate: "Dec 2024",
    completionRate: 50.0,
    avgTimeToComplete: 18,
    teamLeadId: "tl1",
    teamLeadName: "Arjun Mehta",
    region: "NDL"
  },
  {
    id: "wm4",
    name: "Sunita Verma",
    phone: "1000000003",
    totalReferrals: 3,
    totalEarnings: 20000,
    potentialEarnings: 18000,
    joiningDate: "Oct 2024",
    completionRate: 100.0,
    avgTimeToComplete: 7,
    teamLeadId: "tl2",
    teamLeadName: "Kavita Singh",
    region: "SDL"
  },
  {
    id: "wm5",
    name: "Rohit Jain",
    phone: "1000000004",
    totalReferrals: 3,
    totalEarnings: 15000,
    potentialEarnings: 15000,
    joiningDate: "Nov 2024",
    completionRate: 33.3,
    avgTimeToComplete: 20,
    teamLeadId: "tl2",
    teamLeadName: "Kavita Singh",
    region: "SDL"
  }
];

const mockRegionPerformance: RegionPerformance[] = [
  {
    region: "NDL",
    teamLeads: 1,
    wishmasters: 3,
    totalReferrals: 9,
    completedReferrals: 7,
    totalEarnings: 50000,
    completionRate: 77.8,
    avgTimeToComplete: 12
  },
  {
    region: "NDL",
    teamLeads: 1,
    wishmasters: 2,
    totalReferrals: 6,
    completedReferrals: 4,
    totalEarnings: 35000,
    completionRate: 66.7,
    avgTimeToComplete: 15
  }
];

const mockTimelineData: TimelineData[] = [
  { month: "Oct 2024", referrals: 5, completions: 3, earnings: 25000 },
  { month: "Nov 2024", referrals: 6, completions: 4, earnings: 30000 },
  { month: "Dec 2024", referrals: 4, completions: 4, earnings: 30000 }
];

const AdminAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTeamLead, setSelectedTeamLead] = useState<string | null>(null);
  const [selectedWishmaster, setSelectedWishmaster] = useState<string | null>(null);
  const [showSystemWide, setShowSystemWide] = useState(true);
  const [showAggregated, setShowAggregated] = useState(true);
  const [timeRange, setTimeRange] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate system-wide metrics
  const totalTeamLeads = mockTeamLeads.length;
  const totalWishmasters = mockWishmasters.length;
  const totalReferrals = mockWishmasters.reduce((sum, wm) => sum + wm.totalReferrals, 0);
  const totalEarnings = mockWishmasters.reduce((sum, wm) => sum + wm.totalEarnings, 0);
  const avgCompletionRate = mockWishmasters.reduce((sum, wm) => sum + wm.completionRate, 0) / totalWishmasters;
  const avgTimeToComplete = mockWishmasters.reduce((sum, wm) => sum + wm.avgTimeToComplete, 0) / totalWishmasters;

  // Filter data based on selections
  const filteredWishmasters = selectedTeamLead
    ? mockWishmasters.filter(wm => wm.teamLeadId === selectedTeamLead)
    : mockWishmasters;

  const filteredRegions = selectedTeamLead
    ? mockRegionPerformance.filter(rp => {
      const teamLead = mockTeamLeads.find(tl => tl.id === selectedTeamLead);
      return teamLead && rp.region === teamLead.region;
    })
    : mockRegionPerformance;

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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
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
              <div className="w-8 h-8 bg-white text-blue-600 rounded-lg flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <span className="text-lg font-semibold">Admin Analytics</span>
                <div className="text-xs opacity-80">System Performance Insights</div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Download className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>
        </div>



        <div className="p-4 space-y-6">
          <div className="flex items-center justify-end gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="max-w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
              wishmasters={filteredWishmasters}
              selectedWishmaster={selectedWishmaster}
              onWishmasterChange={setSelectedWishmaster}
              showAggregated={showAggregated}
              onShowAggregated={setShowAggregated}
            />
          )}

          {/* System Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <AnalyticCard
              title="Team Leads"
              icon={<Building />}
              color="blue"
              value={totalTeamLeads}
            />

            <AnalyticCard
              title="Wishmasters"
              icon={<Users />}
              color="purple"
              value={totalWishmasters}
            />

            <AnalyticCard
              title="Referrals"
              icon={<Target />}
              color="green"
              value={totalReferrals}
            />

            <AnalyticCard
              title="Total Earnings"
              icon={<IndianRupee />}
              color="orange"
              value={totalEarnings?.toLocaleString()}
              prefix="₹"
            />

            <AnalyticCard
              title="Completion Rate"
              icon={<TrendingUp />}
              color="cyan"
              value={Math.round(avgCompletionRate)}
              suffix="%"
            />

            <AnalyticCard
              title="Avg Time"
              icon={<Clock />}
              color="pink"
              value={Math.round(avgTimeToComplete)}
              suffix="d"
            />
          </div>

          {/* Analytics Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="regions" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Regions
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Top Performers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Top Team Leads
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTeamLeads
                        .sort((a, b) => b.totalEarnings - a.totalEarnings)
                        .map((tl, index) => (
                          <div key={tl.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                                }`}>
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{tl.name}</p>
                                <p className="text-sm text-muted-foreground">{tl.region}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">₹{tl.totalEarnings.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">{tl.totalReferrals} referrals</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Top Wishmasters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockWishmasters
                        .sort((a, b) => b.completionRate - a.completionRate)
                        .slice(0, 3)
                        .map((wm, index) => (
                          <div key={wm.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                                }`}>
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{wm.name}</p>
                                <p className="text-sm text-muted-foreground">{wm.teamLeadName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-600">{wm.completionRate}%</p>
                              <p className="text-sm text-muted-foreground">{wm.totalReferrals} referrals</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Team Lead Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Lead Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Team Lead</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Wishmasters</TableHead>
                        <TableHead>Referrals</TableHead>
                        <TableHead>Completion Rate</TableHead>
                        <TableHead>Avg Time</TableHead>
                        <TableHead>Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTeamLeads.map((tl) => (
                        <TableRow key={tl.id}>
                          <TableCell className="font-medium">{tl.name}</TableCell>
                          <TableCell>{tl.region}</TableCell>
                          <TableCell>{tl.wishmasterCount}</TableCell>
                          <TableCell>{tl.totalReferrals}</TableCell>
                          <TableCell>
                            <Badge variant={tl.completionRate >= 75 ? "default" : tl.completionRate >= 50 ? "secondary" : "destructive"}>
                              {tl.completionRate}%
                            </Badge>
                          </TableCell>
                          <TableCell>{tl.avgTimeToComplete} days</TableCell>
                          <TableCell className="text-green-600 font-bold">₹{tl.totalEarnings.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Wishmaster Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Wishmaster Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Wishmaster</TableHead>
                        <TableHead>Team Lead</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Referrals</TableHead>
                        <TableHead>Completion Rate</TableHead>
                        <TableHead>Avg Time</TableHead>
                        <TableHead>Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWishmasters.map((wm) => (
                        <TableRow key={wm.id}>
                          <TableCell className="font-medium">{wm.name}</TableCell>
                          <TableCell>{wm.teamLeadName}</TableCell>
                          <TableCell>{wm.region}</TableCell>
                          <TableCell>{wm.totalReferrals}</TableCell>
                          <TableCell>
                            <Badge variant={wm.completionRate >= 75 ? "default" : wm.completionRate >= 50 ? "secondary" : "destructive"}>
                              {wm.completionRate}%
                            </Badge>
                          </TableCell>
                          <TableCell>{wm.avgTimeToComplete} days</TableCell>
                          <TableCell className="text-green-600 font-bold">₹{wm.totalEarnings.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regions" className="space-y-6">
              {/* Regional Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRegions.map((region) => (
                      <Card key={region.region} className="border-2">
                        <CardHeader>
                          <CardTitle className="text-lg">{region.region}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Team Leads</p>
                              <p className="text-2xl font-bold text-blue-600">{region.teamLeads}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Wishmasters</p>
                              <p className="text-2xl font-bold text-purple-600">{region.wishmasters}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Referrals</p>
                              <p className="text-2xl font-bold text-green-600">{region.totalReferrals}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Completed</p>
                              <p className="text-2xl font-bold text-orange-600">{region.completedReferrals}</p>
                            </div>
                          </div>
                          <div className="pt-4 border-t">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-muted-foreground">Completion Rate</span>
                              <Badge variant={region.completionRate >= 75 ? "default" : "secondary"}>
                                {region.completionRate}%
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Total Earnings</span>
                              <span className="font-bold text-green-600">₹{region.totalEarnings.toLocaleString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              {/* Timeline Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockTimelineData.map((data, index) => (
                      <div key={data.month} className="border-l-4 border-blue-500 pl-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{data.month}</h3>
                          <Badge variant="outline">{data.completions}/{data.referrals} completed</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">New Referrals</p>
                            <p className="text-xl font-bold text-blue-600">{data.referrals}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Completions</p>
                            <p className="text-xl font-bold text-green-600">{data.completions}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Earnings</p>
                            <p className="text-xl font-bold text-orange-600">₹{data.earnings.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;