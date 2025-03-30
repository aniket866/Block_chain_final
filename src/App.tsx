
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/hooks/use-theme";
import { useState } from "react";

// Pages
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import NFTPage from "./pages/NFTPage";
import DAOPage from "./pages/DAOPage";
import IdentityPage from "./pages/IdentityPage";
import ContractsPage from "./pages/ContractsPage";
import BridgePage from "./pages/BridgePage";
import LearnPage from "./pages/LearnPage";
import DeveloperPage from "./pages/DeveloperPage";
import CommunityPage from "./pages/CommunityPage";
import AboutPage from "./pages/AboutPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a new QueryClient for each component instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Layout><HomePage /></Layout>} />
              <Route path="/nft" element={<Layout><NFTPage /></Layout>} />
              <Route path="/dao" element={<Layout><DAOPage /></Layout>} />
              <Route path="/identity" element={<Layout><IdentityPage /></Layout>} />
              <Route path="/contracts" element={<Layout><ContractsPage /></Layout>} />
              <Route path="/bridge" element={<Layout><BridgePage /></Layout>} />
              <Route path="/analytics" element={<Layout><AnalyticsPage /></Layout>} />
              <Route path="/learn" element={<Layout><LearnPage /></Layout>} />
              <Route path="/community" element={<Layout><CommunityPage /></Layout>} />
              <Route path="/developer" element={<Layout><DeveloperPage /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
