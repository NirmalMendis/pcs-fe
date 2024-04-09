import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Box, Button, Stack, Theme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FC, useEffect, useState } from "react";
import useGetTicketInvoice, {
  InvoiceHTMLType,
} from "../../../../../api/pawn-ticket/use-get-ticket-invoice";
import CityIcon from "../../../../../assets/svg/city.svg";
import RiverIcon from "../../../../../assets/svg/river.svg";
import { MaterialContentTypes } from "../../../../../shared/types/generic";
import { PawnTicket } from "../../../../../shared/types/pawn-ticket";
import CustomerAtomicCard from "../../../customer/customer-atomic-card";
import InvoicePreview from "../../create-ticket/invoice-preview";
import TicketDatesCard from "./ticket-dates";
import TicketInterests from "./ticket-interests";
import TicketMonetaryValues from "./ticket-monetary-values";

export interface TicketGeneralTabProps {
  pawnTicketData?: PawnTicket;
}

const TicketGeneralTab: FC<TicketGeneralTabProps> = ({ pawnTicketData }) => {
  const largeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(largeScreen);

  const { data: invoicePDFData, isFetching: isLoadingPdf } =
    useGetTicketInvoice<Blob>(
      {
        id: pawnTicketData?.invoiceId || 0,
        materialContentType: MaterialContentTypes.PDF,
      },
      pawnTicketData?.invoiceId !== undefined
    );

  const { data: invoiceHTMLData } = useGetTicketInvoice<InvoiceHTMLType>(
    {
      id: pawnTicketData?.invoiceId || 0,
      materialContentType: MaterialContentTypes.HTML,
    },
    pawnTicketData?.invoiceId !== undefined
  );

  const handleInvoiceVisibility = () => {
    setIsInvoiceVisible((prev) => !prev);
  };

  useEffect(() => {
    if (largeScreen) setIsInvoiceVisible(true);
  }, [largeScreen]);

  return (
    <Grid container spacing={1}>
      {!largeScreen ? (
        <Grid xs={12} justifyContent={"end"} display={"flex"}>
          <Button
            startIcon={
              isInvoiceVisible ? (
                <VisibilityOffIcon color="secondary" />
              ) : (
                <VisibilityIcon color="secondary" />
              )
            }
            color="violet"
            sx={{ justifyContent: "start" }}
            onClick={handleInvoiceVisibility}
          >
            {isInvoiceVisible ? `Hide Invoice` : "View Invoice"}
          </Button>
        </Grid>
      ) : null}
      <Grid
        xs
        display={{ xs: isInvoiceVisible ? "none" : "block", md: "block" }}
      >
        <Stack width={"100%"} spacing={3} sx={{ pl: 1, pr: 1 }}>
          <CustomerAtomicCard
            name={pawnTicketData?.customer.name}
            email={pawnTicketData?.customer.email}
          />
          <TicketDatesCard
            dueDate={pawnTicketData?.dueDate}
            pawnDate={pawnTicketData?.pawnDate}
          />
          <TicketMonetaryValues
            principalAmount={pawnTicketData?.principalAmount}
            serviceCharge={pawnTicketData?.serviceCharge}
          />
          <TicketInterests
            interestRate={pawnTicketData?.interestRate}
            monthlyInterest={pawnTicketData?.monthlyInterest}
          />
        </Stack>
      </Grid>
      <Grid
        xs={12}
        md={6}
        display={isInvoiceVisible ? "block" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {invoicePDFData || isLoadingPdf ? (
          <InvoicePreview
            invoicePDFData={invoicePDFData}
            isLoadingPdf={isLoadingPdf}
            invoiceHTMLData={invoiceHTMLData}
            allowDownload
            allowPrint
          />
        ) : (
          <Stack height={"100%"}>
            {pawnTicketData ? (
              <Alert severity="info">
                Perform updates and generate invoice from menu to finalize and
                lock this ticket
              </Alert>
            ) : null}
            <Box
              display={"flex"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                sx={{
                  position: "relative",
                  opacity: 0.7,
                  height: "200px",
                  left: "-50px",
                  top: { xs: "20px", sm: "-40px" },
                }}
              >
                <img style={{ height: "100%" }} src={CityIcon} alt="River" />
                <img
                  style={{
                    height: "100%",
                    position: "absolute",
                    top: "90px",
                    left: "100px",
                  }}
                  src={RiverIcon}
                  alt="City"
                />
              </Box>
            </Box>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default TicketGeneralTab;
