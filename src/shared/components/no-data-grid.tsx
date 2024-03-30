import { Stack, Typography } from "@mui/material";
import NoDataLogo from "../../assets/svg/no-data.svg";

const NoDataGrid = () => {
  return (
    <Stack sx={{ height: "100%", padding: 2, justifyContent: "center" }}>
      <img style={{ height: "100%" }} src={NoDataLogo} />
      <Typography textAlign={"center"} variant="subdued">
        No data !
      </Typography>
    </Stack>
  );
};

export default NoDataGrid;
