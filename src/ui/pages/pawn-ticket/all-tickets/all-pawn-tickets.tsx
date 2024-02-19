import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PageTitleCard from "../../../../shared/components/page-title-card";
import CreateTicket from "../create-ticket/create-ticket";
import AllPawnTicketsDrid from "./all-pawn-tickets-grid";

const AllPawnTickets = () => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const handleShowCreateTicket = () => {
    setShowCreateTicket(true);
  };
  const handleHideCreateTicket = () => {
    setShowCreateTicket(false);
  };

  return (
    <Grid container sx={{ p: 1 }}>
      {showCreateTicket && (
        <Grid item xs={12}>
          <Fade
            in={showCreateTicket}
            mountOnEnter
            unmountOnExit
            {...(showCreateTicket ? { timeout: 1000 } : {})}
          >
            <Stack>
              <Box display="flex" sx={{ justifyContent: "end" }}>
                <IconButton onClick={handleHideCreateTicket}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>
              <CreateTicket />
            </Stack>
          </Fade>
        </Grid>
      )}
      {!showCreateTicket && (
        <Grid item xs={12}>
          <Fade
            in={!showCreateTicket}
            mountOnEnter
            unmountOnExit
            {...(!showCreateTicket ? { timeout: 1000 } : {})}
          >
            <Stack spacing={1.5}>
              <PageTitleCard>
                <Grid
                  container
                  justifyContent="space-between"
                  spacing={{ xs: 2 }}
                >
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      All Pawn Tickets
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ justifyContent: "end", display: "flex" }}>
                      <Button
                        color="primary"
                        size="medium"
                        onClick={handleShowCreateTicket}
                      >
                        Create ticket
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </PageTitleCard>
              <AllPawnTicketsDrid />
            </Stack>
          </Fade>
        </Grid>
      )}
    </Grid>
  );
};

export default AllPawnTickets;
