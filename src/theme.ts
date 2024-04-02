import {
  PaletteMode,
  ThemeOptions,
  alpha,
  getContrastRatio,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    subdued: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subdued?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    subdued: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    ternary: Palette["primary"];
    violet: Palette["primary"];
    icon: Palette["primary"];
  }

  interface PaletteOptions {
    ternary?: PaletteOptions["primary"];
    violet?: PaletteOptions["primary"];
    icon?: PaletteOptions["primary"];
  }
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    violet: true;
    ternary: true;
    icon: true;
  }
  interface SvgIconPropsColorOverrides {
    violet: true;
    ternary: true;
    icon: true;
  }
}

const violetBase = "#5403a6";
const violetMain = alpha(violetBase, 0.8);

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#0063b1", //top app bar, !
            light: "#f5fbff", //side drawer !
            dark: "#8b8994", //lower tabs selected text !
            contrastText: "#fff",
          },
          secondary: {
            main: "#ffffff", // page header tabs- tablayout !
            light: "#e8e9f0", //customer search result and inner tab border !
            dark: "#829baf", //lower tabs unselected text !
            contrastText: "#000",
          },
          ternary: {
            main: "#f5f5f5", // app background + DataCard background
            light: "#b2ebf2",
            dark: "#a7bac9",
            contrastText: "#000",
          },
          violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText:
              getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
          },
          icon: {
            main: "#7dccd1",
            light: "#13754a",
            dark: "#0063b1",
            contrastText: "#ffffff",
          },
        }
      : {}),
  },
});

export const commonTheme: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
        style: {
          borderRadius: 8,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          "scrollbar-width": "thin",
        },
        "*::-webkit-scrollbar": {
          width: "4px",
          height: "4px",
        },
      },
    },
  },
  typography: {
    fontSize: 11,
    fontFamily: [
      "Segoe UI Symbol",
      "Segoe UI Emoji",
      '"Segoe UI"',
      "Roboto",
      '"Apple Color Emoji"',
      "-apple-system",
      "Arial",
      "sans-serif",
    ].join(","),
    h6: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h4: {
      textTransform: "uppercase",
    },
    body1: {
      color: "#000",
    },
    subdued: {
      color: "#8a8a8a",
    },
  },
};
