import { Box, Paper, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import AssetankLogo from "../../../assets/svg/assetank-logo.svg";

export interface AuthContainerProps extends PropsWithChildren {
  title: string;
}
const AuthContainer: FC<AuthContainerProps> = ({ title, children }) => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: { xs: "15%", sm: "10%", md: "8%" }, ml: 1, mr: 1 }}
    >
      <Stack
        component={Paper}
        elevation={8}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: { sm: "60vw", md: "40vw", lg: "35vw" },
          height: "fit-content",
        }}
        spacing={2}
      >
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
            marginBottom: "30px !important",
          }}
        >
          <img
            style={{ maxWidth: "300px" }}
            src={AssetankLogo}
            alt="Bookin Dynamics Logo"
          />
        </Box>
        <Typography variant="h5">{title}</Typography>
        <Stack spacing={3}>
          <Divider />
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuthContainer;
