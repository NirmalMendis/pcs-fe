import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { FC, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useMetaData from "../../../../api/meta-data/use-get-metadata";
import { InvoiceHTMLType } from "../../../../api/pawn-ticket/use-get-ticket-invoice";
import { MetaDataEnum } from "../../../../constants/string-constants";
import InlinePdfPreview from "../../../../shared/components/inline-pdf-preview";
import { InvoiceSettingsType } from "../../../../shared/types/generic";

export interface InvoicePreviewProps {
  isLoadingPdf: boolean;
  invoicePDFData?: Blob;
  invoiceHTMLData?: InvoiceHTMLType | undefined;
  pawnTicketId?: number;
  allowPrint?: boolean;
  allowDownload?: boolean;
}

const InvoicePreview: FC<InvoicePreviewProps> = ({
  invoicePDFData,
  isLoadingPdf,
  invoiceHTMLData,
  pawnTicketId,
  allowPrint,
  allowDownload,
}) => {
  const invoiceHTMLRef = useRef<HTMLElement | null>(null);
  const { data: invoicePdfSettings } = useMetaData<InvoiceSettingsType>({
    type: MetaDataEnum.INVOICE_PDF_SETTINGS,
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
      a.download = pawnTicketId
        ? `ticket_${pawnTicketId}.pdf`
        : "draft_ticket.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Box sx={{ height: "100%", backgroundColor: "ternary.main", pb: 2 }}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h6" sx={{ pl: 2 }}>
            Invoice
          </Typography>
          {!isLoadingPdf && (
            <Stack direction={"row"} spacing={1} sx={{ mt: 1, mr: 1 }}>
              {allowPrint && invoicePDFData ? (
                <IconButton
                  color="primary"
                  onClick={handlePrint}
                  size="large"
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: "5px",
                    padding: "8px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    height: "fit-content",
                  }}
                >
                  <PrintIcon color="secondary" fontSize="inherit" />
                </IconButton>
              ) : null}
              {allowDownload && invoiceHTMLData ? (
                <IconButton
                  color="primary"
                  onClick={handleDownloadInvoice}
                  size="large"
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: "5px",
                    padding: "8px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    height: "fit-content",
                  }}
                >
                  <DownloadIcon color="secondary" fontSize="inherit" />
                </IconButton>
              ) : null}
            </Stack>
          )}
        </Stack>
        {isLoadingPdf ? (
          <Box
            sx={{ height: "100%", display: "flex" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <LinearProgress sx={{ width: "40%" }} />
          </Box>
        ) : (
          <Box width={"100%"} justifyContent={"center"} display={"flex"}>
            <Box
              width={{ xs: "max-content" }}
              maxWidth={{ xs: "90vw", md: "max-content" }}
              overflow={"scroll"}
            >
              <InlinePdfPreview file={invoicePDFData as File} />
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default InvoicePreview;
