
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Calls from "./pages/Calls";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Index />
            </MainLayout>
          } />
          <Route path="/dashboard" element={
            <MainLayout>
              <Index />
            </MainLayout>
          } />
          <Route path="/calls" element={
            <MainLayout>
              <Calls />
            </MainLayout>
          } />
          <Route path="/analytics" element={
            <MainLayout>
              <Analytics />
            </MainLayout>
          } />
          <Route path="/messages" element={
            <MainLayout>
              <Messages />
            </MainLayout>
          } />
          <Route path="/billing" element={
            <MainLayout>
              <Billing />
            </MainLayout>
          } />
          <Route path="/clients" element={
            <MainLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Clients</h1>
                <p className="text-muted-foreground mt-2">Client management coming soon...</p>
              </div>
            </MainLayout>
          } />
          <Route path="/appointments" element={
            <MainLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Appointments</h1>
                <p className="text-muted-foreground mt-2">Appointment scheduling coming soon...</p>
              </div>
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground mt-2">Application settings coming soon...</p>
              </div>
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
