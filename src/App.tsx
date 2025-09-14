import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SplashScreen from "./pages/SplashScreen";
import NotFound from "./pages/NotFound";
import TextToSpeech from "./pages/TextToSpeech";
import VoiceCloning from "./pages/VoiceCloning";
import VoiceLibrary from "./pages/VoiceLibrary";
import Projects from "./pages/Projects";
import ConversationalAI from "./pages/ConversationalAI";
import Enterprise from "./pages/Enterprise";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Creative Platform Routes */}
              <Route path="/text-to-speech" element={<TextToSpeech />} />
              <Route path="/voice-cloning" element={<VoiceCloning />} />
              <Route path="/voice-library" element={<VoiceLibrary />} />
              <Route path="/projects" element={<Projects />} />
              
              {/* Agents Platform Routes */}
              <Route path="/conversational-ai" element={<ConversationalAI />} />
              
              {/* Main Navigation Routes */}
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
