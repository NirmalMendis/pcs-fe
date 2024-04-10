import { CssBaseline } from "@mui/material";
import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoginLayoutImg from "../../assets/images/login-layout-img.png";

export const Main = styled("main")(() => ({
  bgcolor: "custom.light",
  backgroundImage: `url(${LoginLayoutImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "100vh",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const LoginLayout = () => {
  return (
    <Main>
      <CssBaseline />
      <Outlet />
      <footer style={{ textAlign: "right", paddingRight: "5px" }}>
        © 2024 Softank Technologies
      </footer>
    </Main>
  );
};

export default LoginLayout;
