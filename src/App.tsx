import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ReferEarn from "./pages/ReferEarn";
import Messages from "./pages/Messages";
import Rankings from "./pages/Rankings";
import TeamLeadIndex from "./pages/TeamLeadIndex";
import AdminIndex from "./pages/AdminIndex";
import AdminReferrals from "./pages/AdminReferrals";
import AdminAnalytics from "./pages/AdminAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/refer" element={<ReferEarn />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/teamlead" element={<TeamLeadIndex />} />
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/referrals" element={<AdminReferrals />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
