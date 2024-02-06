import { CircularProgress } from "@mui/material";
import MuiBackdrop, { BackdropOwnProps } from "@mui/material/Backdrop";
import { FC } from "react";

export type BackdropProps = BackdropOwnProps;

const Backdrop: FC<BackdropProps> = ({ open }) => {
  return (
    <MuiBackdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
