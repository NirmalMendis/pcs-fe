import { Box, Slide, Stack } from "@mui/material";
import { Link } from "@mui/material";
import { useRef } from "react";
import AuthContainer from "./auth-container";
import LoginForm from "./login-form/login-form";

const Login = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <AuthContainer title="Login">
      <Box ref={containerRef} sx={{ overflow: "hidden" }}>
        <Slide
          in={true}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
          direction="right"
          timeout={1000}
        >
          <Stack sx={{ pt: 1 }} spacing={1}>
            <LoginForm />
            <Box>
              <Link
                component="button"
                variant="body2"
                //  onClick={() => setUIState(FORGOT_PASSWORD)}
                underline="none"
              >
                Forgot Password?
              </Link>
            </Box>
          </Stack>
        </Slide>
      </Box>
    </AuthContainer>
  );
};

export default Login;
