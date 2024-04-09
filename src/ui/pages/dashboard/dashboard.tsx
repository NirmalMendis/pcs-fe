import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DashboardStatCard from "../../../shared/components/dashboard-stat-card";
import PageTitleCard from "../../../shared/components/page-title-card";
import { PawnTicketStatusEnum } from "../../../shared/types/generic";
const Dashboard = () => {
  return (
    <Stack sx={{ pb: 1, pl: 3, pr: 3 }} spacing={1}>
      <PageTitleCard
        justifyContent="space-between"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        sx={{ gap: 1 }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Dashboard
        </Typography>
      </PageTitleCard>
      <Grid
        container
        xs={12}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          xs={12}
          sm={6}
          md={3}
          justifyContent="center"
          sx={{ display: "flex" }}
        >
          <DashboardStatCard
            icon={PrivacyTipIcon}
            color="#135875"
            dataTitle="Receivable Interest"
            values={[
              {
                label: PawnTicketStatusEnum.ACTIVE,
                value: "12",
              },
              {
                label: "Today",
                value: "Rs 12",
              },
              {
                label: "Monthh",
                value: "Rs 12",
              },
            ]}
          />
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
          justifyContent="center"
          sx={{ display: "flex" }}
        >
          <DashboardStatCard
            icon={SafetyCheckIcon}
            color="#e8b846"
            dataTitle="Receivable Interest"
            values={[
              {
                label: PawnTicketStatusEnum.DUE,
                value: "12",
              },
              {
                label: "Total",
                value: "Rs 12",
              },
            ]}
            delay="100ms"
          />
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
          justifyContent="center"
          sx={{ display: "flex" }}
        >
          <DashboardStatCard
            icon={VerifiedUserIcon}
            color="#00c2a9"
            dataTitle="Earned Interest"
            values={[
              {
                label: PawnTicketStatusEnum.RECOVERED,
                value: "12",
              },
              {
                label: "Monthh",
                value: "Rs 12",
              },
            ]}
            delay="200ms"
          />
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
          justifyContent="center"
          sx={{ display: "flex" }}
        >
          <DashboardStatCard
            icon={DirectionsRunIcon}
            color="#e36500"
            dataTitle="Lost Interest"
            values={[
              {
                label: PawnTicketStatusEnum.FORFEITED,
                value: "12",
              },
              {
                label: "Monthh",
                value: "Rs 12",
              },
            ]}
            delay="300ms"
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Dashboard;
