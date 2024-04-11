import { Box, Button, Paper, Stack } from "@mui/material";
import { Link } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import AssetankLogo from "../../../assets/svg/assetank-logo.svg";
import ROUTE_PATHS from "../../../constants/route-paths";

const LandingPage = () => {
  return (
    <Grid
      container
      component={Box}
      sx={{
        mt: { xs: "30%", sm: "20%", md: "10%" },
        justifyContent: "center",
      }}
    >
      <Grid xs={11} sm={8} md={6} lg={5}>
        <Stack
          component={Paper}
          sx={{ p: 5, pb: { xs: 2, lg: 5 } }}
          elevation={8}
          spacing={3}
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
              style={{ maxWidth: "400px", width: "100%" }}
              src={AssetankLogo}
            />
          </Box>
          <Stack alignItems={"center"} spacing={3}>
            <Box
              sx={{
                width: "350px",
                pl: 9,
                "& .bold-text": {
                  fontWeight: "bold",
                  textAlign: "center",
                  fontStyle: "italic",
                  fontSize: "1.3rem",
                },
              }}
            >
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Empowering Simplicity...!")
                    .pauseFor(2000)
                    .deleteChars(14)
                    .typeString("Dynamics...!")
                    .pauseFor(2000)
                    .deleteChars(12)
                    .typeString("Your Business...!")
                    .pauseFor(2000)
                    .deleteChars(17)
                    .start();
                }}
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 50,
                  wrapperClassName: "bold-text",
                }}
              />
            </Box>
            <Link
              component={NavLink}
              to={ROUTE_PATHS.LOGIN}
              sx={{ textDecoration: "none" }}
            >
              <Button size="large">Sign In</Button>
            </Link>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
