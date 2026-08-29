import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { UnitPage } from "./pages/UnitPage";
import { rtlCache } from "./rtlCache";
import { theme } from "./theme";
import { ProtectedLayout } from "./pages/ProtectedLayout/ProtectedLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const App = () => {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer pauseOnFocusLoss={false} />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route path="/" element={<ProtectedLayout />}>
                <Route path="/" element={<Home />}  />
                <Route path="/unit/:slug" element={<UnitPage />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
