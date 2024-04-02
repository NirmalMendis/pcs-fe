import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
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
import { useReactToPrint } from "react-to-print";
import useMetaData from "../../../../api/meta-data/use-get-metadata";
import useGetTicketInvoice, {
  InvoiceHTMLType,
} from "../../../../api/pawn-ticket/use-get-ticket-invoice";
import PartyImage from "../../../../assets/svg/party-icon.svg";
import ROUTE_PATHS from "../../../../constants/route-paths";
import { MetaDataEnum } from "../../../../constants/string-constants";
import {
  InvoiceSettingsType,
  MaterialContentTypes,
} from "../../../../shared/types/generic";
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
  const invoiceHTMLRef = useRef<HTMLElement | null>(null);
  const largeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(largeScreen);
  const { data: invoicePdfSettings } = useMetaData<InvoiceSettingsType>({
    type: MetaDataEnum.INVOICE_PDF_SETTINGS,
  });
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

  const handlePrintToPDF = useReactToPrint({
    content: () => invoiceHTMLRef.current,
    pageStyle: `
        @page {
            /* Remove browser default header (title) and footer (url) */
            margin: ${invoicePdfSettings?.margin.value};
            size: ${invoicePdfSettings?.pageSize.value};
        }
        @media print {
            body {
                /* Tell browsers to print background colors */
                -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
                color-adjust: exact; /* Firefox */
            }
        }
    `,
  });

  const handlePrint = async () => {
    if (invoiceHTMLData?.invoiceHTML) {
      const htmlObject = document.createElement("html");
      htmlObject.innerHTML = invoiceHTMLData?.invoiceHTML;
      invoiceHTMLRef.current = htmlObject;
      handlePrintToPDF();
    }
  };

  const handleDownloadInvoice = () => {
    if (invoicePDFData) {
      const url = window.URL.createObjectURL(
        new Blob([invoicePDFData], { type: "application/pdf" })
      );
      const a = document.createElement("a");

      a.href = url;
      a.download = "filename.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

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
        <Typography variant="h6" sx={{ mb: 1 }} ref={printButtonRef}>
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
      <Grid container>
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
                startIcon={<PrintIcon color="secondary" />}
                sx={{ justifyContent: "start" }}
                onClick={handlePrint}
              >
                Print Invoice
              </Button>
              <Button
                startIcon={<DownloadIcon color="secondary" />}
                sx={{ justifyContent: "start" }}
                onClick={handleDownloadInvoice}
              >
                Download Invoice
              </Button>
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
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TicketCompleted;
