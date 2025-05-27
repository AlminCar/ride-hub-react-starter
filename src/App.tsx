import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { AppInitializer } from "./components/AppInitializer";
import Home from "./pages/Home";
import MyRides from "./pages/MyRides";
import AddNewRide from "./pages/AddNewRide";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import UserProfile from "./pages/UserProfile";
import Map from "./pages/Map";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ViewEditRide from "./pages/ViewEditRide";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <AppInitializer />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-rides" element={<MyRides />} />
                <Route path="/view-details-of-past-rides/:id" element={<ViewEditRide />} />
                <Route path="/edit-ride/:id" element={<ViewEditRide />} />
                <Route path="/add-ride" element={<AddNewRide />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/map" element={<Map />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
