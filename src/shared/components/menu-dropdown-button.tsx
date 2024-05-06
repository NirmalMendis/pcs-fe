import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, ButtonGroup, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { FC, useState } from "react";
import { StatusColors } from "../../constants/color-constants";

export interface MenuDropDownButtonProps {
  selection: string;
  options: Array<{
    label: string;
    disabled?: boolean;
    onClick?: () => void;
  }>;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const MenuDropDownButton: FC<MenuDropDownButtonProps> = ({
  options,
  selection,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (onClick?: () => void) => {
    if (onClick) onClick();
    handleClose();
  };

  return (
    <Box sx={{ height: "100%", display: "flex", width: "100%" }}>
      <ButtonGroup
        variant="contained"
        sx={{
          boxShadow: "none",
          border: "1px solid",
          "&:hover": {
            backgroundColor: StatusColors[selection].color,
            borderColor: StatusColors[selection].backgroundColor,
            color: "white",
          },
          ...StatusColors[selection],
          width: "100%",
        }}
        onClick={handleClick}
      >
        <Button
          sx={{
            backgroundColor: "inherit",
            color: "inherit",
            "&:hover": { backgroundColor: "inherit" },
            paddingLeft: 5,
            paddingRight: 5,
            width: "100%",
          }}
        >
          {options.find((option) => option.label === selection)?.label}
        </Button>
        <Button
          size="small"
          sx={{
            backgroundColor: "inherit",
            color: "inherit",
            "&:hover": { backgroundColor: "inherit" },
          }}
        >
          <ArrowDropDownIcon
            sx={{
              color: "inherit",
            }}
          />
        </Button>
      </ButtonGroup>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            onClick={handleMenuItemClick.bind(this, option.onClick)}
            disableRipple
            key={option.label}
            sx={{ gap: 2 }}
            disabled={option.disabled}
          >
            Switch to <KeyboardDoubleArrowRightIcon color="primary" />
            <Typography
              sx={{
                border: "1px solid",
                borderColor: StatusColors[option.label].borderColor,
                color: StatusColors[option.label].color,
                p: "5px",
                pt: "3px",
                pb: "3px",
                borderRadius: "3px",
                width: "100%",
                backgroundColor: StatusColors[option.label].backgroundColor,
              }}
              textAlign="center"
            >
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </StyledMenu>
    </Box>
  );
};

export default MenuDropDownButton;
