import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Menu,
  Bell,
  Settings,
  CheckCircle,
  Clock,
  Gift,
  Lightbulb,
  MessageSquare
} from "lucide-react";

const Messages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const messages = [
    {
      id: "1",
      type: "success",
      icon: CheckCircle,
      title: "Referral Completed!",
      description: "Great news! Amit Sharma has completed all requirements. Your ₹10,000 reward has been processed and will be credited to your account within 2-3 business days. Thank you for your successful referral!",
      date: "12/28/2024",
      isRead: false,
      category: "success"
    },
    {
      id: "2",
      type: "progress",
      icon: Clock,
      title: "Referral Update - First Delivery Started",
      description: "Excellent progress! Deepak Patel has started delivering orders and completed his first successful delivery. Your ₹5,000 advance payment is being processed and will be credited within 24-48 hours. He now needs to complete Step 5 criteria fo...",
      date: "12/27/2024",
      isRead: true,
      category: "progress"
    },
    {
      id: "3",
      type: "offer",
      icon: Gift,
      title: "New Year Bonus Offer!",
      description: "Special New Year promotion is now live! Earn an extra ₹2,000 bonus on each successful referral completed in January 2025. This is in addition to your regular ₹10,000 reward. Limited time offer - refer your friends now and maximize your earnings!",
      date: "12/25/2024",
      isRead: false,
      category: "offers"
    },
    {
      id: "4",
      type: "tip",
      icon: Lightbulb,
      title: "Referral Success Tip",
      description: "Pro tip for better conversion rates: Share your referral code with friends who are actively looking for delivery jobs and have all required documents ready (PAN, Aadhaar). Candidates with complete documentation have 85% higher success rates in...",
      date: "12/24/2024",
      isRead: true,
      category: "tips"
    },
    {
      id: "5",
      type: "progress",
      icon: Clock,
      title: "Onboarding in Progress",
      description: "Update on Vikash Singh: He has successfully downloaded the app and started the onboarding process. Document verification is currently in progress. Expected completion within 2-3 business days. You will be notified once he moves to...",
      date: "12/23/2024",
      isRead: true,
      category: "progress"
    }
  ];

  const tabs = [
    { id: "all", label: "All", count: 2 },
    { id: "offers", label: "Offers", count: 1 },
    { id: "progress", label: "Progress", count: 0 },
    { id: "success", label: "Success", count: 1 },
    { id: "tips", label: "Tips", count: 0 }
  ];

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "progress":
        return Clock;
      case "offer":
        return Gift;
      case "tip":
        return Lightbulb;
      default:
        return MessageSquare;
    }
  };

  const getMessageStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          iconColor: "text-green-600",
          iconBg: "bg-green-100",
          borderColor: "border-l-green-500"
        };
      case "progress":
        return {
          iconColor: "text-blue-600",
          iconBg: "bg-blue-100",
          borderColor: "border-l-blue-500"
        };
      case "offer":
        return {
          iconColor: "text-orange-600",
          iconBg: "bg-orange-100",
          borderColor: "border-l-orange-500"
        };
      case "tip":
        return {
          iconColor: "text-purple-600",
          iconBg: "bg-purple-100",
          borderColor: "border-l-purple-500"
        };
      default:
        return {
          iconColor: "text-gray-600",
          iconBg: "bg-gray-100",
          borderColor: "border-l-gray-500"
        };
    }
  };

  const filteredMessages = activeTab === "all"
    ? messages
    : messages.filter(msg => msg.category === activeTab);

  const unreadCount = messages.filter(msg => !msg.isRead).length;

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
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages Content */}
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Messages Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Messages</h1>
              <p className="text-sm text-muted-foreground">{unreadCount} unread messages</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex overflow-x-scroll gap-1 mb-6 p-1 bg-gray-100 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${activeTab === tab.id ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.map((message) => {
              const IconComponent = getMessageIcon(message.type);
              const styles = getMessageStyles(message.type);

              return (
                <Card
                  key={message.id}
                  className={`border-l-4 ${styles.borderColor} ${!message.isRead ? "bg-blue-50/50" : ""
                    }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${styles.iconBg} mt-1`}>
                        <IconComponent className={`h-5 w-5 ${styles.iconColor}`} />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground">{message.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{message.date}</span>
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {message.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-500">No messages in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;