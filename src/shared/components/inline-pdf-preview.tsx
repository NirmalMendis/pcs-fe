import { Box, styled } from "@mui/material";
import { FC, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export interface PdfPreviewProps {
  file?: File | undefined;
}

const StyledDocument = styled(Document)(() => ({
  width: "fit-content",
  height: "fit-content",
  maxHeight: "850px",
  gap: "10px",
  display: "flex",
  flexDirection: "column",
}));

const InlinePdfPreview: FC<PdfPreviewProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number>();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <StyledDocument file={file} onLoadSuccess={onDocumentLoadSuccess} noData="">
      {Array.from(new Array(numPages), (el, index) => (
        <Box
          key={`page_${index + 1}`}
          sx={{
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
            margin: "5px",
          }}
        >
          <Page pageNumber={index + 1} />
        </Box>
      ))}
    </StyledDocument>
  );
};

export default InlinePdfPreview;
