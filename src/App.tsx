import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Methodology from "./pages/Methodology";
import ModelArchitecture from "./pages/ModelArchitecture";
import Results from "./pages/Results";
import Demo from "./pages/Demo";
import Applications from "./pages/Applications";
import ResearchPaper from "./pages/ResearchPaper";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/methodology" element={<Layout><Methodology /></Layout>} />
          <Route path="/model-architecture" element={<Layout><ModelArchitecture /></Layout>} />
          <Route path="/results" element={<Layout><Results /></Layout>} />
          <Route path="/demo" element={<Layout><Demo /></Layout>} />
          <Route path="/auth" element={<Layout><Auth /></Layout>} />
          <Route path="/applications" element={<Layout><Applications /></Layout>} />
          <Route path="/research-paper" element={<Layout><ResearchPaper /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
