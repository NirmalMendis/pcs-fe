import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Stack, Typography, Zoom } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetCustomerById from "../../../../api/customer/use-get-customer-by-id";
import Backdrop from "../../../../shared/components/backdrop";
import PageTitleCard from "../../../../shared/components/page-title-card";
import Tabs from "../../../../shared/components/tabs";
import CustomerGeneralTab from "./general/customer-general-tab";
import UpdateCustomerDialog from "./update-customer-dialog";

const TABS = {
  GENERAL: {
    INDEX: 0,
    NAME: "General",
  },
};

const UpdateCustomer = () => {
  const { id: customerId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);

  const { data: customerData, isFetching: isFetchingCustomerData } =
    useGetCustomerById(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: +customerId!,
      },
      customerId !== undefined
    );

  const changeTab = (value: number) => {
    setCurrentTab(value);
  };

  return (
    <Stack sx={{ p: 1 }} spacing={1}>
      <PageTitleCard
        justifyContent="space-between"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        sx={{ gap: 1 }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Customer
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"end"}
          gap={2}
        >
          <Button
            variant="contained"
            startIcon={<EditIcon color="secondary" />}
            sx={{ pl: 2, pr: 2 }}
            onClick={() => setOpenCustomerModal(true)}
            disabled={isFetchingCustomerData || !customerData}
          >
            Edit
          </Button>
        </Stack>
        {customerData ? (
          <UpdateCustomerDialog
            openCustomerModal={openCustomerModal}
            setOpenCustomerModal={setOpenCustomerModal}
            customer={customerData}
          />
        ) : null}
      </PageTitleCard>
      <Tabs
        tabs={Object.values(TABS).map((tab) => tab.NAME)}
        currentTab={currentTab}
        changeTab={changeTab}
      >
        <Box>
          <Zoom in={true} mountOnEnter unmountOnExit timeout={500}>
            <Box>
              <CustomerGeneralTab customer={customerData} />
            </Box>
          </Zoom>
        </Box>
      </Tabs>
      <Backdrop open={isFetchingCustomerData} />
    </Stack>
  );
};

export default UpdateCustomer;
