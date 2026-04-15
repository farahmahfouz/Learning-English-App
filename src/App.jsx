import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./context/DarkModeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Auth from "./pages/Auth";
import PlacementTest from "./pages/Placementtest";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Levels from "./pages/Levels";
import Level from "./pages/Level";
import Quiz from "./pages/Quiz";
import Shadowing from "./pages/Shadowing";
import Certificate from "./pages/Certificate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
})

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="placement-test" element={<PlacementTest />} />
              <Route path="levels" element={<Levels />} />
              <Route path="levels/:levelId" element={<Level />} />
              <Route path="levels/:levelId/quiz" element={<Quiz />} />
              <Route path="shadowing" element={<Shadowing />} />
              <Route path="certificate" element={<Certificate />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App