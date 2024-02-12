import { Box, styled } from "@mui/material";

const PageTitleCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: 20,
  borderRadius: 5,
}));

export default PageTitleCard;
