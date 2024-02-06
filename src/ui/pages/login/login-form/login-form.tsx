import { Button, Stack, TextField } from "@mui/material";
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

  const { signIn, isLoading } = useAuthService();
  const onSubmit = (data: LoginFormValues) => {
    // eslint-disable-next-line no-console
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width={400}>
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Login
        </Button>
      </Stack>
      <Backdrop open={isLoading} />
    </form>
  );
};

export default LoginForm;
