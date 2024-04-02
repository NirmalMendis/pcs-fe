import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import { Divider, List } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { CSSObject, Theme } from "@mui/material/styles";
import { useContext } from "react";
import { DRAWER_WIDTH } from "../../../constants/generic-constants";
import DrawerListItem from "./drawer-list-item";
import { DrawerContext } from "./main-layout";

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${
    theme.breakpoints.down("sm") ? theme.spacing(0) : theme.spacing(7)
  } + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  position: "absolute",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NavigationDrawer = () => {
  const { open, handleDrawerOpen, handleDrawerClose } =
    useContext(DrawerContext);

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
      PaperProps={{
        sx: {
          paddingTop: "43px",
          backgroundColor: "primary.light",
        },
      }}
    >
      <Divider />
      <nav>
        <List>
          <DrawerListItem to="/" text="Home" icon={<HomeIcon color="icon" />} />
          <DrawerListItem
            to="/pawn-ticket"
            text="Pawn Ticket"
            icon={<DiamondIcon color="icon" />}
          />
        </List>
      </nav>
    </Drawer>
  );
};

export default NavigationDrawer;
