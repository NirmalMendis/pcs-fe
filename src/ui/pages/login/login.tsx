import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import LoginImage from "../../../assets/images/login-image.jpg";
import GoldBricksImage from "../../../assets/svg/gold-bricks.svg";
import { PRODUCT_NAME } from "../../../constants/string-constants";
import LoginForm from "./login-form/login-form";

const Login = () => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
      direction={"column"}
    >
      <Grid
        item
        xs={12}
        sm={8}
        elevation={8}
        sx={{
          p: 5,
        }}
        component={Paper}
      >
        <Grid
          container
          item
          direction={{ xs: "column", sm: "row" }}
          xs={12}
          spacing={2}
        >
          <Grid
            item
            xs={7}
            display={{ xs: "none", sm: "flex" }}
            width={{ xs: "400px" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img
              style={{ width: "100%", height: "auto" }}
              src={LoginImage}
              alt="Pawn center logo Logo"
            />
          </Grid>
          <Grid item xs={5} padding={2}>
            <Stack
              justifyContent={"space-between"}
              sx={{ height: "100%" }}
              spacing={{ xs: 2, sm: 1 }}
            >
              <Typography variant="h5" textAlign={"center"}>
                {PRODUCT_NAME}
              </Typography>
              <Box
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}
              >
                <img style={{ maxWidth: "100px" }} src={GoldBricksImage} />
              </Box>
              <Typography variant="h6">Login</Typography>
              <LoginForm />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      {/* <ForgotPwdForm />
      <SetNewPasswordForm /> */}
    </Grid>
  );
};

export default Login;
