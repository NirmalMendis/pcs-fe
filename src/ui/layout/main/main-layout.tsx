import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "./app-bar";
import AppBarProfile from "./app-bar-profile";
import NavigationDrawer from "./navigation-drawer";

export const DrawerContext = createContext({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleDrawerOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleDrawerClose: () => {},
});

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: 0,
  margin: 0,
  minHeight: "100vh",
  overflowX: "hidden",
  paddingLeft: `calc(${
    theme.breakpoints.down("sm") ? theme.spacing(0) : theme.spacing(7)
  } + 1px)`,
  [theme.breakpoints.up("sm")]: {
    paddingLeft: `calc(${theme.spacing(7)} + 1px)`,
  },
}));

const MainLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar variant="outlined" position="fixed" open={open}>
        <Toolbar
          style={{
            maxHeight: "40px",
            height: "100%",
            minHeight: "10px",
            padding: 0,
          }}
        >
          <Box
            sx={{
              width: `calc(${theme.spacing(7)} + 1px)`,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
              {!open && <MenuIcon color="secondary" />}
              {open && <ChevronLeftIcon color="secondary" />}
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "secondary.light" }}
          >
            Pawning Center System
          </Typography>
          <Stack direction="row" sx={{ ml: "auto" }} spacing={1}>
            <AppBarProfile />
          </Stack>
        </Toolbar>
      </AppBar>
      <DrawerContext.Provider
        value={{ open, handleDrawerClose, handleDrawerOpen }}
      >
        <NavigationDrawer />
      </DrawerContext.Provider>
      <Main>
        <Toolbar style={{ height: "40px", minHeight: "10px" }} />
        <Box>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};

export default MainLayout;
