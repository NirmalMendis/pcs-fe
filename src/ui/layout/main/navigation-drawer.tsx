import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Divider, List } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { CSSObject, Theme } from "@mui/material/styles";
import { useContext } from "react";
import { DRAWER_WIDTH } from "../../../constants/generic-constants";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../constants/iam-constants";
import ROUTE_PATHS from "../../../constants/route-paths";
import { FeatureEnum } from "../../../shared/types/generic";
import useUserPermissions from "../../../utils/auth/use-user-permissions";
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
  const { canAccessResource, withFeatureEnabled } = useUserPermissions();

  const authorizedPawnTicketDrawerItem = withFeatureEnabled(
    canAccessResource(
      <DrawerListItem
        to={ROUTE_PATHS.PAWN_TICKET.BASE}
        text="Pawn Ticket"
        icon={<DiamondIcon color="icon" />}
      />,
      PERMISSIONS.PAWN_TICKET,
      PERMISSION_ACTIONS.VIEW
    ),
    FeatureEnum.PAWN_TICKET
  );

  const authorizedIAMDrawerItem = withFeatureEnabled(
    canAccessResource(
      <DrawerListItem
        to={ROUTE_PATHS.IAM.BASE}
        text="Access Control"
        icon={<SupervisorAccountIcon color="icon" />}
      />,
      PERMISSIONS.IAM,
      PERMISSION_ACTIONS.VIEW
    ),
    FeatureEnum.IAM
  );

  const authorizedCustomerDrawerItem = withFeatureEnabled(
    canAccessResource(
      <DrawerListItem
        to={ROUTE_PATHS.CUSTOMER.BASE}
        text="Customer"
        icon={<SensorOccupiedIcon color="icon" />}
      />,
      PERMISSIONS.CUSTOMER,
      PERMISSION_ACTIONS.VIEW
    ),
    FeatureEnum.CUSTOMER
  );

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
          <DrawerListItem
            to={ROUTE_PATHS.DASHBOARD}
            text="Home"
            icon={<HomeIcon color="icon" />}
          />
          {authorizedPawnTicketDrawerItem}
          {authorizedIAMDrawerItem}
          {authorizedCustomerDrawerItem}
        </List>
      </nav>
    </Drawer>
  );
};

export default NavigationDrawer;
