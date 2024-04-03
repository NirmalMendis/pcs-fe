import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FC, useRef, useState } from "react";

export interface EllipsisMenuProps {
  options: Array<{
    onClick: () => void;
    label: string;
    disabled?: boolean;
  }>;
}
const EllipsisMenu: FC<EllipsisMenuProps> = ({ options }) => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        ref={buttonRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={buttonRef.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            onClick={() => {
              handleClose();
              option.onClick();
            }}
            key={`menu_${index}_${option.label}`}
            sx={{ fontWeight: "bold" }}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default EllipsisMenu;
