import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PageTitleCard from "../../../../shared/components/page-title-card";
import CreateTicket from "../create-ticket/create-ticket";

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
      <Grid item xs={12}>
        <Slide in={showCreateTicket} direction="up" mountOnEnter unmountOnExit>
          <Box>
            <Box display="flex" sx={{ justifyContent: "end" }}>
              <IconButton onClick={handleHideCreateTicket}>
                <CloseIcon />
              </IconButton>
            </Box>
            <CreateTicket />
          </Box>
        </Slide>
      </Grid>
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
          </Stack>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default AllPawnTickets;
