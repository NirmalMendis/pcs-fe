import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTE_PATHS from "../../../constants/route-paths";
import { Main } from "../../layout/main/main-layout";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Grid container>
        <Grid item xs={12} textAlign="center" sx={{ mt: 10 }}>
          <DirectionsWalkIcon sx={{ fontSize: 70 }} />
        </Grid>
        <Grid item xs={12} textAlign="center" sx={{ mt: 4 }}>
          <Typography fontFamily="cursive" variant="h1" color="primary.main">
            Oops! Lost your way?
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign="center" sx={{ mt: 8 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate(`${ROUTE_PATHS.DASHBOARD}`)}
        >
          Home
        </Button>
      </Grid>
    </Main>
  );
};

export default Unauthorized;
