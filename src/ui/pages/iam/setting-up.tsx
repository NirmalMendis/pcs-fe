import SettingsIcon from "@mui/icons-material/Settings";
import { Grid, Typography } from "@mui/material";
import { Main } from "../../layout/main/main-layout";

const SettingUp = () => {
  return (
    <Main>
      <Grid container>
        <Grid item xs={12} textAlign="center" sx={{ mt: 10 }}>
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
        <Grid item xs={12} textAlign="center" sx={{ mt: 4 }}>
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
