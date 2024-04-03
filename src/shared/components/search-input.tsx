import SearchIcon from "@mui/icons-material/Search";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { FC } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  border: `1px solid ${theme.palette.secondary.dark}`,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

export interface SearchInputProps extends InputBaseProps {
  placeholder: string;
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { placeholder, onChange, value, defaultValue } = props;
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        inputProps={{ "aria-label": "search" }}
        defaultValue={defaultValue}
      />
    </Search>
  );
};

export default SearchInput;
