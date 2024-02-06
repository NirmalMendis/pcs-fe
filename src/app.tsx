import { PaletteMode, createTheme } from "@mui/material";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { useMemo, useState } from "react";
import Routes from "./routes/routes";
import { commonTheme, getDesignTokens } from "./theme";

const App = () => {
  //refer MUI docs when setting up theme toggle btn
  const [mode] = useState<PaletteMode>("light");

  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode), commonTheme)),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
