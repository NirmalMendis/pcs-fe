import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ProfileAvatar from "../../../shared/components/profile-avatar";
import useAuthService from "../../../utils/auth/use-auth-service";

const AppBarProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { signOut, getBasicUserInfo } = useAuthService();
  const userInfo = getBasicUserInfo();
  const name = userInfo?.firstName + " " + userInfo?.lastName;

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="secondary"
      >
        <ProfileAvatar name={name} size="medium" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
        //   onClick={() =>
        //     navigate(
        //       `/${ROUTE_CONFIG.PROFILE.PATH}/${ROUTE_CONFIG.PROFILE.TABS.PERSONAL_PATH}`
        //     )
        //   }
        >
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <ProfileAvatar name={name} size="medium" />
            <Stack>
              <Typography fontWeight="bold">{name}</Typography>
              <Typography color="subdued.main">{userInfo?.email}</Typography>
            </Stack>
          </Stack>
        </MenuItem>
        <MenuItem onClick={signOut}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <LogoutIcon sx={{ fontSize: 30 }} />
            <Typography fontWeight="bold">Sign Out</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AppBarProfile;
