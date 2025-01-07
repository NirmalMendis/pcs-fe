import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { addMonths } from "date-fns";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../../constants/iam-constants";
import PageTitleCard from "../../../../shared/components/page-title-card";
import { ItemTypes, TimePeriod } from "../../../../shared/types/generic";
import PermissionsWrapper from "../../access-control/permissions-wrapper";
import { CRUItemFormValues } from "../create-ticket/add-item/cru-item-form";
import { CreatePawnTicketFormValues } from "../create-ticket/create-pawn-ticket-form";
import CreateTicket from "../create-ticket/create-ticket";
import InstantCalculator from "../instant-calculator/instant-calculator";
import AllPawnTicketsGrid from "./all-pawn-tickets-grid";

export type TicketFormData = CreatePawnTicketFormValues;

export const initialTicketFormData = {
  pawnDate: new Date(),
  dueDate: addMonths(new Date(), 1),
  periodType: TimePeriod.month,
};

export interface TicketFormItem extends CRUItemFormValues {
  isSubmitted: boolean;
  uiId: number;
}

export const emptyItem: TicketFormItem = {
  isSubmitted: false,
  itemType: ItemTypes.GOLD,
  uiId: 0,
} as TicketFormItem;

interface CreateTicketContextType {
  createPawnTicketFormData?: Partial<TicketFormData>;
  setCreatePawnTicketFormData: Dispatch<
    SetStateAction<Partial<TicketFormData>>
  >;
  items?: Array<TicketFormItem>;
  setItems: Dispatch<SetStateAction<Array<TicketFormItem>>>;
}

export const CreateTicketContext = createContext<CreateTicketContextType>({
  setCreatePawnTicketFormData: () => null,
  setItems: () => null,
});

const AllPawnTickets = () => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const [createPawnTicketFormData, setCreatePawnTicketFormData] = useState<
    Partial<TicketFormData>
  >(initialTicketFormData);
  const [items, setItems] = useState<Array<TicketFormItem>>([emptyItem]);

  const handleShowCreateTicket = () => {
    setCreatePawnTicketFormData(initialTicketFormData);
    setItems([emptyItem]);
    setShowCreateTicket(true);
  };
  const handleHideCreateTicket = () => {
    setShowCreateTicket(false);
  };

  return (
    <Grid container sx={{ p: 1 }}>
      {showCreateTicket && (
        <Grid xs={12}>
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
              <CreateTicketContext.Provider
                value={{
                  createPawnTicketFormData,
                  setCreatePawnTicketFormData,
                  items,
                  setItems,
                }}
              >
                <CreateTicket />
              </CreateTicketContext.Provider>
            </Stack>
          </Fade>
        </Grid>
      )}
      {!showCreateTicket && (
        <Grid xs={12}>
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
                  <Grid xs={12} sm={4}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Pawn Tickets
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={4} justifyContent={"end"} display={"flex"}>
                    <Stack direction={"row"} spacing={2}>
                      <CreateTicketContext.Provider
                        value={{
                          setCreatePawnTicketFormData,
                          setItems,
                        }}
                      >
                        <InstantCalculator
                          setShowCreateTicket={setShowCreateTicket}
                        />
                      </CreateTicketContext.Provider>
                      <PermissionsWrapper
                        permission={{
                          action: PERMISSION_ACTIONS.CREATE,
                          permissionType: PERMISSIONS.PAWN_TICKET,
                        }}
                      >
                        <Button
                          color="primary"
                          size="medium"
                          onClick={handleShowCreateTicket}
                          startIcon={<AddIcon color="secondary" />}
                        >
                          Create ticket
                        </Button>
                      </PermissionsWrapper>
                    </Stack>
                  </Grid>
                </Grid>
              </PageTitleCard>
              <AllPawnTicketsGrid />
            </Stack>
          </Fade>
        </Grid>
      )}
    </Grid>
  );
};

export default AllPawnTickets;
