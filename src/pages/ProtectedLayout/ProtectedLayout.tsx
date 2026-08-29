import { Box } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthUser } from "../../api/auth/useAuthUser";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";

export const ProtectedLayout = () => {
  const { data: user, isLoading, isError } = useAuthUser();
  const location = useLocation();

  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {isLoading ? <PageLoader /> : <Outlet />}
      </Box>
      <Footer />
    </Box>
  );
};
