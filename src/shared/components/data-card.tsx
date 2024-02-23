import { Paper, styled } from "@mui/material";

type DataCardProps = {
  highlightBackground?: boolean;
  backgroundImg?: string;
};

const DataCard = styled(Paper, {
  shouldForwardProp: (prop) =>
    prop !== "highlightBackground" && prop !== "backgroundImg",
})<DataCardProps>(({ theme, highlightBackground, backgroundImg }) => ({
  padding: "15px",
  boxShadow: "none",
  border: "1px solid",
  borderColor: theme.palette.secondary.main,
  height: "100%",
  position: "relative",
  minHeight: "120px",
  backgroundColor: theme.palette.secondary.main,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "10px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    opacity: highlightBackground ? 0.7 : 0.08,
    backgroundImage: backgroundImg ? `url(${backgroundImg})` : "none",
    backgroundPosition: "center",
    backgroundSize: "100px",
    backgroundRepeat: "no-repeat",
  },
}));

export default DataCard;
