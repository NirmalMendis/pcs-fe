import { PaletteMode, createTheme } from "@mui/material";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useMemo, useState } from "react";
import Routes from "./routes/routes";
import { commonTheme, getDesignTokens } from "./theme";

const App = () => {
  //refer MUI docs when setting up theme toggle btn
  const [mode] = useState<PaletteMode>("light");

  const theme = useMemo(
    () => responsiveFontSizes(createTheme(commonTheme, getDesignTokens(mode))),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Routes />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
