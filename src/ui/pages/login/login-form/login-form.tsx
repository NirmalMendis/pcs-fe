import { Box, Button, Stack, TextField } from "@mui/material";

const LoginForm = () => {
  return (
    <Box>
      <h1>Login</h1>
      <form noValidate>
        <Stack spacing={2} width={400}>
          <TextField label="Email" type="email" />
          <TextField label="Password" type="password" />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
