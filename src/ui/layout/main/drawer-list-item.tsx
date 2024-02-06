import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC, ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DrawerContext } from "./main-layout";

export interface DrawerListItemProps {
  to: string;
  icon: ReactNode;
  text: string;
}
const MuiLink = styled(NavLink)(({ theme }) => ({
  "&.active": {
    backgroundColor: theme.palette.ternary.light,
  },
}));

const DrawerListItem: FC<DrawerListItemProps> = ({ icon, text, to }) => {
  const { handleDrawerClose } = useContext(DrawerContext);
  return (
    <Link
      component={MuiLink}
      to={to}
      onClick={handleDrawerClose}
      sx={{ textDecoration: "none" }}
    >
      <ListItem key={text} sx={{ backgroundColor: "inherit" }} disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default DrawerListItem;
