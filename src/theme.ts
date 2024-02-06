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
            light: "#f5fbff",
            main: "#0063b1",
            dark: "#002884",
            contrastText: "#fff",
          },
          secondary: {
            light: "#e8e9f0",
            main: "#ffffff",
            dark: "#829baf",
            contrastText: "#000",
          },
          ternary: {
            light: "#b2ebf2",
            main: "#ffffff",
            dark: "#829baf",
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
        variant: "standard",
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTypography: {
      defaultProps: {
        fontSize: "12px",
      },
    },
  },
  typography: {
    fontSize: 12,
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
      color: "#444e57",
    },
    h5: {
      fontWeight: "bold",
      color: "#444e57",
    },
    h4: {
      color: "#444e57",
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
