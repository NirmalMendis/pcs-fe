import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, DrawerProps, IconButton, useTheme } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export interface ModalDrawerProps extends DrawerProps, PropsWithChildren {
  handleModalClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDrawer: FC<ModalDrawerProps> = ({
  onClose,
  children,
  handleModalClose,
  sx: styles,
  ...rest
}) => {
  const theme = useTheme();
  const integratedOnClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    handleModalClose(false);
    if (onClose && event && reason) onClose(event, reason);
  };

  return (
    <Drawer
      sx={{
        zIndex: theme.zIndex.drawer + 2,
        ...styles,
      }}
      onClose={integratedOnClose}
      {...rest}
    >
      <Box display="flex" sx={{ marginLeft: "auto" }}>
        <IconButton aria-label="delete" onClick={integratedOnClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
};

export default ModalDrawer;
