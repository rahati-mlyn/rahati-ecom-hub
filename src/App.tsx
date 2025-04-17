
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddStorePage from "./pages/AddStorePage";
import NotFound from "./pages/NotFound";
import { isAuthenticated } from "@/services/api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [language, setLanguage] = useState<string>("ar");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check authentication on app load
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);
  
  // Set RTL or LTR based on language
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={<HomePage language={language} onLanguageChange={setLanguage} />} 
            />
            <Route 
              path="/add-store" 
              element={<AddStorePage />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
