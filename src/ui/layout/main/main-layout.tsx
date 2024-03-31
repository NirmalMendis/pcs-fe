import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import useGetUser from "../../../api/user/use-get-user";
import usePatchUserActiveBranch from "../../../api/user/use-patch-user-active-branch";
import Backdrop from "../../../shared/components/backdrop";
import { FeatureEnum } from "../../../shared/types/generic";
import useAuthStore from "../../../store/use-auth-store-state";
import PermissionsWrapper from "../../pages/iam/permissions-wrapper";
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

export const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: 0,
  margin: 0,
  minHeight: "100vh",
  backgroundColor: theme.palette.ternary.main,
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
  const user = useAuthStore((state) => state.user);

  const { data: currentUser, refetch } = useGetUser(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: user!.id!,
    },
    user?.id !== undefined
  );
  const {
    mutate: mutatePatchUserActiveBranch,
    isPending: isPendingPatchUserActiveBranch,
  } = usePatchUserActiveBranch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onChangeActiveBranch = (event: SelectChangeEvent<number>) => {
    if (event.target.value)
      mutatePatchUserActiveBranch(
        {
          payload: {
            activeBranchId: +event.target.value,
          },
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
          <Stack
            direction="row"
            display={"flex"}
            sx={{ ml: "auto" }}
            alignItems={"center"}
            spacing={1}
          >
            {currentUser ? (
              <PermissionsWrapper feature={FeatureEnum.MULTIPLE_BRANCHES}>
                <Select
                  value={currentUser?.activeBranchId}
                  onChange={onChangeActiveBranch}
                  variant="standard"
                  size="small"
                  sx={{
                    minHeight: "10px",
                    height: "20px",
                    color: "secondary.light",
                    "::before": {
                      borderColor: "white !important",
                    },
                  }}
                  IconComponent={() => null}
                >
                  {currentUser?.branches?.map((branch) => (
                    <MenuItem value={branch.id} key={branch.id}>
                      {branch.title}
                    </MenuItem>
                  ))}
                </Select>
              </PermissionsWrapper>
            ) : null}
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
      <Backdrop open={isPendingPatchUserActiveBranch} />
    </Box>
  );
};

export default MainLayout;
