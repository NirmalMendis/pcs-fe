import { Box, Stack, Typography, Zoom } from "@mui/material";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetPawnTicketById from "../../../../api/pawn-ticket/use-get-pawn-ticket-by-id";
import { TYPING_TIMEOUT_FOR_SEARCH } from "../../../../constants/generic-constants";
import Backdrop from "../../../../shared/components/backdrop";
import MenuDropDownButton from "../../../../shared/components/menu-dropdown-button";
import PageTitleCard from "../../../../shared/components/page-title-card";
import SearchInput from "../../../../shared/components/search-input";
import Tabs from "../../../../shared/components/tabs";
import { PawnTicketStatusEnum } from "../../../../shared/types/generic";
import TicketGeneralTab from "./general/ticket-general-tab";
import TicketInterestsSchedule from "./interests/ticket-interests-schedule";
import TicketItemsTab from "./items/ticket-items";

const TABS = {
  GENERAL: {
    INDEX: 0,
    NAME: "General",
  },
  ITEMS: {
    INDEX: 1,
    NAME: "Items",
  },
  INTERESTS: {
    INDEX: 1,
    NAME: "Interests",
  },
  PAYMENTS: {
    INDEX: 3,
    NAME: "Payments",
  },
  REDEMPTIONS: {
    INDEX: 2,
    NAME: "Redemptions",
  },
};

const UpdateTicket = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { id: ticketId } = useParams();
  const navigate = useNavigate();

  const {
    data: pawnTicketData,
    refetch,
    isFetching: isFetchingPawnTicketData,
  } = useGetPawnTicketById(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: +ticketId!,
    },
    false
  );

  const changeTab = (value: number) => {
    setCurrentTab(value);
  };

  const onChangeSearch = (
    event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    navigate(event?.target.value || "");
  };

  useEffect(() => {
    const debouncedApiCall = debounce(() => {
      refetch();
    }, TYPING_TIMEOUT_FOR_SEARCH);

    if (ticketId) debouncedApiCall();

    return () => {
      debouncedApiCall.cancel();
    };
  }, [ticketId, refetch]);

  return (
    <Stack sx={{ pb: 1, pl: 3, pr: 3 }} spacing={1}>
      <PageTitleCard
        justifyContent="space-between"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        sx={{ gap: 1 }}
      >
        <Stack direction="row" spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Pawn Ticket
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={2}>
          <SearchInput
            onChange={onChangeSearch}
            placeholder="Search pawn ticket..."
          />
          {pawnTicketData?.status ? (
            <MenuDropDownButton
              selection={pawnTicketData?.status}
              options={Object.values(PawnTicketStatusEnum).map((option) => ({
                label: option,
                disabled: false,
              }))}
            />
          ) : null}
        </Stack>
      </PageTitleCard>
      <Tabs
        tabs={Object.values(TABS)
          // .filter((tab) => {
          //   if (booking.id) {
          //     return true;
          //   } else {
          //     if (tab.NAME === TABS.GENERAL.NAME) {
          //       return true;
          //     }
          //   }
          //   return false;
          // })
          .map((tab) => tab.NAME)}
        currentTab={currentTab}
        changeTab={changeTab}
      >
        <Box>
          <Zoom
            in={true}
            mountOnEnter
            unmountOnExit
            // style={{ transitionDelay: !showEditForm ? "400ms" : "0ms" }}
            timeout={500}
          >
            <Box>
              <TicketGeneralTab pawnTicketData={pawnTicketData} />
            </Box>
          </Zoom>
        </Box>
        <Box>
          {pawnTicketData?.id !== undefined ? (
            <Zoom
              in={true}
              mountOnEnter
              unmountOnExit
              // style={{ transitionDelay: !showEditForm ? "400ms" : "0ms" }}
              timeout={500}
            >
              <Box>
                <TicketItemsTab id={pawnTicketData?.id} />
              </Box>
            </Zoom>
          ) : null}
        </Box>
        {pawnTicketData?.id ? (
          <Box>
            <Zoom
              in={true}
              mountOnEnter
              unmountOnExit
              // style={{ transitionDelay: !showEditForm ? "400ms" : "0ms" }}
              timeout={500}
            >
              <Box>
                <TicketInterestsSchedule id={pawnTicketData?.id} />
              </Box>
            </Zoom>
          </Box>
        ) : null}
      </Tabs>
      <Backdrop open={isFetchingPawnTicketData} />
    </Stack>
  );
};

export default UpdateTicket;
