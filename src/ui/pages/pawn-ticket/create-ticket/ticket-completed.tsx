import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetTicketInvoice, {
  InvoiceHTMLType,
} from "../../../../api/pawn-ticket/use-get-ticket-invoice";
import PartyImage from "../../../../assets/svg/party-icon.svg";
import ROUTE_PATHS from "../../../../constants/route-paths";
import { MaterialContentTypes } from "../../../../shared/types/generic";
import InvoicePreview from "./invoice-preview";

export interface TicketCompletedProps {
  handleReset: () => void;
  invoiceID: number;
  pawnTicketId: number;
}
const TicketCompleted: FC<TicketCompletedProps> = ({
  handleReset,
  invoiceID,
  pawnTicketId,
}) => {
  const printButtonRef = useRef<HTMLDivElement>(null);

  const largeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(largeScreen);

  const navigate = useNavigate();

  const { data: invoicePDFData, isFetching: isLoadingPdf } =
    useGetTicketInvoice<Blob>({
      id: invoiceID,
      materialContentType: MaterialContentTypes.PDF,
    });

  const { data: invoiceHTMLData } = useGetTicketInvoice<InvoiceHTMLType>({
    id: invoiceID,
    materialContentType: MaterialContentTypes.HTML,
  });

  const handleInvoiceVisibility = () => {
    setIsInvoiceVisible((prev) => !prev);
  };

  useEffect(() => {
    // Focus on the button element when the component is loaded
    if (printButtonRef.current) {
      printButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <Stack divider={<Divider orientation="horizontal" />} spacing={2}>
      <Box display={"flex"} justifyContent={"space-between"} sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ticket Completed
        </Typography>
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
      </Box>
      <Grid container ref={printButtonRef}>
        <Grid
          item
          xs
          sx={{ pl: "0px !important", pb: 2 }}
          display={{ xs: isInvoiceVisible ? "none" : "block", md: "block" }}
        >
          <Stack
            sx={{ height: "100%", pt: 5 }}
            alignItems={"center"}
            spacing={8}
          >
            <Typography variant="h5">{`Cheers! You're all set !`}</Typography>
            <img style={{ maxWidth: "100px" }} src={PartyImage} />
            <Stack spacing={1}>
              <Button
                startIcon={<VisibilityIcon color="secondary" />}
                sx={{ justifyContent: "start" }}
                onClick={() =>
                  navigate(
                    `../${ROUTE_PATHS.PAWN_TICKET.UPDATE}/${pawnTicketId}`,
                    {
                      relative: "path",
                    }
                  )
                }
              >
                View Pawn Ticket
              </Button>
              <Button
                startIcon={<AddIcon color="secondary" />}
                sx={{ justifyContent: "start" }}
                onClick={handleReset}
              >
                Create New Pawn Ticket
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7} display={isInvoiceVisible ? "block" : "none"}>
          <InvoicePreview
            invoicePDFData={invoicePDFData}
            isLoadingPdf={isLoadingPdf}
            invoiceHTMLData={invoiceHTMLData}
            allowDownload
            allowPrint
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TicketCompleted;
