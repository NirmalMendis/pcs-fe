import { Button, Stack, TextField } from "@mui/material";
import { InferType } from "yup";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import loginSchema from "./login-schema";

type LoginSchemaType = typeof loginSchema;
type LoginFormValues = InferType<LoginSchemaType>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useCustomHookForm<LoginSchemaType>(loginSchema);

  const onSubmit = (data: LoginFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
    </form>
  );
};

export default LoginForm;
