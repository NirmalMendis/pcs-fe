import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Grid, Stack, Theme, useMediaQuery } from "@mui/material";
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
        <Grid item xs={12} justifyContent={"end"} display={"flex"}>
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
        item
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
        item
        xs={12}
        md={6}
        display={isInvoiceVisible ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {invoicePDFData ? (
          <InvoicePreview
            invoicePDFData={invoicePDFData}
            isLoadingPdf={isLoadingPdf}
            invoiceHTMLData={invoiceHTMLData}
            allowDownload
            allowPrint
          />
        ) : (
          <Box sx={{ position: "relative", opacity: 0.8 }}>
            <img style={{ height: "250px" }} src={CityIcon} alt="River" />
            <img
              style={{
                height: "250px",
                position: "absolute",
                top: "100px", // Adjust the vertical position as needed
                left: "140px", // Adjust the horizontal position as needed
              }}
              src={RiverIcon}
              alt="City"
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default TicketGeneralTab;
