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
import { addMonths } from "date-fns";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../../constants/iam-constants";
import PageTitleCard from "../../../../shared/components/page-title-card";
import PermissionsWrapper from "../../iam/permissions-wrapper";
import { CRUItemFormValues } from "../create-ticket/add-item/cru-item-form";
import { CreatePawnTicketFormValues } from "../create-ticket/create-pawn-ticket-form";
import CreateTicket from "../create-ticket/create-ticket";
import InstantCalculator from "../instant-calculator/instant-calculator";
import AllPawnTicketsDrid from "./all-pawn-tickets-grid";

export interface TicketFormData extends CreatePawnTicketFormValues {
  customerName: string;
}

export const initialTicketFormData = {
  pawnDate: new Date(),
  dueDate: addMonths(new Date(), 1),
};

export const emptyItem: CRUItemFormValues & {
  isSubmitted: boolean;
  uiId: number;
} = {
  appraisedValue: 0,
  caratage: 0,
  description: "",
  pawningAmount: 0,
  weight: 0,
  isSubmitted: false,
  uiId: 0,
};

export interface TicketFormItem extends CRUItemFormValues {
  isSubmitted: boolean;
  uiId: number;
}

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
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    justifyContent={"end"}
                    display={"flex"}
                  >
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
                        >
                          Create ticket
                        </Button>
                      </PermissionsWrapper>
                    </Stack>
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
