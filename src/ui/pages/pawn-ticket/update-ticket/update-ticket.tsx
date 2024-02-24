import { Box, Stack, Typography, Zoom } from "@mui/material";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import useGetPawnTicketById from "../../../../api/pawn-ticket/use-get-pawn-ticket-by-id";
import { TYPING_TIMEOUT_FOR_SEARCH } from "../../../../constants/generic-constants";
import Backdrop from "../../../../shared/components/backdrop";
import PageTitleCard from "../../../../shared/components/page-title-card";
import SearchInput from "../../../../shared/components/search-input";
import Tabs from "../../../../shared/components/tabs";
import TicketGeneralTab from "./general/ticket-general-tab";
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
  const [ticketId, setTicketId] = useState<string | undefined>();

  const {
    data,
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
    setTicketId(event?.target.value);
  };

  useEffect(() => {
    const debouncedApiCall = debounce(() => {
      refetch();
    }, TYPING_TIMEOUT_FOR_SEARCH);

    if (ticketId) debouncedApiCall();

    return () => {
      debouncedApiCall.cancel();
    };
  }, [ticketId]);

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
        <Stack>
          <SearchInput
            onChange={onChangeSearch}
            placeholder="Search pawn ticket..."
            value={ticketId}
          />
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
              <TicketGeneralTab pawnTicketData={data} />
            </Box>
          </Zoom>
        </Box>
        <Box>
          <Zoom
            in={true}
            mountOnEnter
            unmountOnExit
            // style={{ transitionDelay: !showEditForm ? "400ms" : "0ms" }}
            timeout={500}
          >
            <Box>
              <TicketItemsTab items={data?.items} />
            </Box>
          </Zoom>
        </Box>
      </Tabs>
      <Backdrop open={isFetchingPawnTicketData} />
    </Stack>
  );
};

export default UpdateTicket;
