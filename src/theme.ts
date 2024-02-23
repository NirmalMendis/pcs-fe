import { PaletteMode, ThemeOptions } from "@mui/material";

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
  }

  interface PaletteOptions {
    ternary?: PaletteOptions["primary"];
  }
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            light: "#f5fbff", //top tab layout, drawer
            main: "#0063b1", //top app bar, icons
            dark: "#8b8994", //lower tabs selected text
            contrastText: "#fff",
          },
          secondary: {
            light: "#e8e9f0",
            main: "#ffffff",
            dark: "#829baf", //lower tabs unselected text
            contrastText: "#000",
          },
          ternary: {
            light: "#b2ebf2",
            main: "#f5f5f5",
            dark: "#a7bac9",
            contrastText: "#000",
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
