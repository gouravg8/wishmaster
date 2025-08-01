import { useState } from "react";
import { Gift, FileText, Download, Users, Truck, CheckCircle, Menu, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReferralFormModal from "@/components/modals/ReferralFormModal";
import { AppSidebar } from "@/components/AppSidebar";

const ReferEarn = () => {
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const referralSteps = [
    {
      icon: FileText,
      title: "Referral Submitted",
      description: "Fill referral form and submit details",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Download,
      title: "App Downloaded",
      description: "Friend downloads delivery app",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Users,
      title: "Onboarding Complete",
      description: "KYC verification and document approval",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      icon: Truck,
      title: "First Delivery",
      description: "Starts delivering orders successfully",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: CheckCircle,
      title: "Criteria Complete",
      description: "Meets all requirements - You get paid!",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    }
  ];

  const earnMorePoints = [
    "₹10,000 per successful referral",
    "₹5,000 advance payment after first delivery",
    "Bonus rewards during peak seasons",
    "No limit on number of referrals"
  ];

  const helpFriendsPoints = [
    "Flexible working hours",
    "Earn up to ₹45,000/month",
    "No investment required",
    "Trusted platform with millions of users"
  ];

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
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between sticky top-0 z-50">
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
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Hero Section */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-4">Refer & Earn ₹10,000</h1>
                <p className="text-lg mb-6 opacity-90">
                  Invite your friends to join as delivery partners and earn rewards for each successful referral.
                </p>
                <Button
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setShowReferralModal(true)}
                >
                  + Refer a Friend Now
                </Button>
              </div>
              <div className="absolute top-4 right-4">
                <Gift className="h-16 w-16 opacity-20" />
              </div>
            </Card>
          </div>

          {/* 5-Step Process */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">5-Step Referral Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {referralSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                  </div>
                  <h3 className="font-medium text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Track Progress:</span> Monitor each step in your dashboard and get notified when your referral moves to the next stage.
              </p>
            </div>
          </div>

          {/* Earn More & Help Friends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Earn More</h3>
              </div>
              <ul className="space-y-2">
                {earnMorePoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Help Friends</h3>
              </div>
              <ul className="space-y-2">
                {helpFriendsPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to Start Earning?</h3>
            <p className="text-muted-foreground mb-6">
              Refer your friends today and start earning rewards immediately.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowReferralModal(true)}
            >
              + Make Your First Referral
            </Button>
          </div>

          {/* Referral Form Modal */}
          <ReferralFormModal
            open={showReferralModal}
            onOpenChange={setShowReferralModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;