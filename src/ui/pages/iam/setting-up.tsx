import SettingsIcon from "@mui/icons-material/Settings";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Main } from "../../layout/main/main-layout";

const SettingUp = () => {
  return (
    <Main>
      <Grid container>
        <Grid xs={12} textAlign="center" sx={{ mt: 10 }}>
          <SettingsIcon
            sx={{
              fontSize: 100,
              animation: "spin 5s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(360deg)",
                },
                "100%": {
                  transform: "rotate(0deg)",
                },
              },
            }}
          />
        </Grid>
        <Grid xs={12} textAlign="center" sx={{ mt: 4 }}>
          <Typography
            fontFamily="cursive"
            fontStyle="italic"
            variant="h1"
            color="primary.main"
          >
            Setting Up Page...
          </Typography>
        </Grid>
      </Grid>
    </Main>
  );
};

export default SettingUp;
