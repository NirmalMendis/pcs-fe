import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { FC } from "react";
import InlinePdfPreview from "../../../../shared/components/inline-pdf-preview";

export interface InvoicePreviewProps {
  isLoadingPdf: boolean;
  invoicePDFData?: Blob;
}

const InvoicePreview: FC<InvoicePreviewProps> = ({
  invoicePDFData,
  isLoadingPdf,
}) => {
  return (
    <Box sx={{ height: "100%", backgroundColor: "ternary.main", pb: 2 }}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Typography variant="h6" sx={{ pl: 2 }}>
          Invoice
        </Typography>
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
              maxWidth={{ xs: "100vw", md: "max-content" }}
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
