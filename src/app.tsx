import { PaletteMode, createTheme } from "@mui/material";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { GENERIC_ERROR } from "./constants/string-constants";
import Routes from "./routes/routes";
import { commonTheme, getDesignTokens } from "./theme";
import { showMutationError, showQueryError } from "./utils/error-handler";

const App = () => {
  //refer MUI docs when setting up theme toggle btn
  const [mode] = useState<PaletteMode>("light");

  const theme = useMemo(
    () => responsiveFontSizes(createTheme(commonTheme, getDesignTokens(mode))),
    [mode]
  );

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error, _, __, mutation) => {
        if (
          error instanceof AxiosError &&
          mutation.options.mutationKey &&
          showMutationError(mutation.options.mutationKey)
        ) {
          if (error.response?.data.message)
            enqueueSnackbar(error.response?.data.message, {
              variant: "error",
            });
          else
            enqueueSnackbar(GENERIC_ERROR, {
              variant: "error",
            });
        }
      },
    }),
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (
          error instanceof AxiosError &&
          query.options.queryKey &&
          showQueryError(query.options.queryKey)
        ) {
          if (error.response?.data.message)
            enqueueSnackbar(error.response?.data.message, {
              variant: "error",
            });
          else
            enqueueSnackbar(GENERIC_ERROR, {
              variant: "error",
            });
        }
      },
    }),
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
