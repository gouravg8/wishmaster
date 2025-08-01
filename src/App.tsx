import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoutesConfig from "./config/routes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster theme="light" richColors className="z-50" />
      <RoutesConfig />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
