import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Skeleton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import useGetTicketStatusStats from "../../../api/stat/use-get-ticket-status-stats";
import DashboardStatCard from "../../../shared/components/dashboard-stat-card";
import PageTitleCard from "../../../shared/components/page-title-card";
import useTextFormatter from "../../../shared/hooks/use-text-formatter";
import { PawnTicketStatusEnum } from "../../../shared/types/generic";

const Dashboard = () => {
  const {
    data: ticketStatusStats,
    isFetching: isFetchingGetTicketStatusStats,
  } = useGetTicketStatusStats();
  const { formatRs } = useTextFormatter();

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
      {ticketStatusStats && formatRs ? (
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
                  value: String(
                    ticketStatusStats[PawnTicketStatusEnum.ACTIVE].totalCount
                  ),
                },
                {
                  label: "Today",
                  value: formatRs(
                    String(ticketStatusStats[PawnTicketStatusEnum.ACTIVE].today)
                  ),
                },
                {
                  label: "Month",
                  value: formatRs(
                    String(ticketStatusStats[PawnTicketStatusEnum.ACTIVE].month)
                  ),
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
                  value: String(
                    ticketStatusStats[PawnTicketStatusEnum.DUE].totalCount
                  ),
                },
                {
                  label: "Total",
                  value: formatRs(
                    String(
                      ticketStatusStats[PawnTicketStatusEnum.DUE].totalValue
                    )
                  ),
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
                  value: String(
                    ticketStatusStats[PawnTicketStatusEnum.RECOVERED].totalCount
                  ),
                },
                {
                  label: "Month",
                  value: formatRs(
                    String(
                      ticketStatusStats[PawnTicketStatusEnum.RECOVERED]
                        .totalValue
                    )
                  ),
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
                  value: String(
                    ticketStatusStats[PawnTicketStatusEnum.FORFEITED].totalCount
                  ),
                },
                {
                  label: "Month",
                  value: formatRs(
                    String(
                      ticketStatusStats[PawnTicketStatusEnum.FORFEITED]
                        .totalValue
                    )
                  ),
                },
              ]}
              delay="300ms"
            />
          </Grid>
        </Grid>
      ) : isFetchingGetTicketStatusStats ? (
        <Grid
          container
          xs={12}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {Array.from(Array(4)).map((x, index) => (
            <Grid
              key={index}
              xs={12}
              sm={6}
              md={3}
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <Skeleton variant="rectangular" width={210} height={118} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Stack>
  );
};

export default Dashboard;
