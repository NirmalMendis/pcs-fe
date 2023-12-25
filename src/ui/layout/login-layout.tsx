import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <Box sx={{ bgcolor: "custom.light" }}>
      <Outlet />
    </Box>
  );
};

export default LoginLayout;
