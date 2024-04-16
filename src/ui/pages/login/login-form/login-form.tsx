import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { InferType } from "yup";
import Backdrop from "../../../../shared/components/backdrop";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import useAuthService from "../../../../utils/auth/use-auth-service";
import loginSchema from "./login-schema";

type LoginSchemaType = typeof loginSchema;
type LoginFormValues = InferType<LoginSchemaType>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useCustomHookForm<LoginSchemaType>(loginSchema);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { signIn, isLoading } = useAuthService();
  const onSubmit = (data: LoginFormValues) => {
    // eslint-disable-next-line no-console
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon color="warning" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" color="primary" disabled={!isValid}>
          Login
        </Button>
      </Stack>
      <Backdrop open={isLoading} />
    </form>
  );
};

export default LoginForm;
