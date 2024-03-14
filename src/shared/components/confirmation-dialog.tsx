import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

export interface ConfirmationDialogProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>> | (() => void);
  title: string;
  content: string | JSX.Element;
  confirmAction: () => void;
  confirmActionTitle?: string;
  cancelActionTitle?: string;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  handleClose,
  title,
  content,
  confirmAction,
  confirmActionTitle = "Yes",
  cancelActionTitle = "Cancel",
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="inherit">
          {cancelActionTitle}
        </Button>
        <Button onClick={confirmAction} autoFocus>
          {confirmActionTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
