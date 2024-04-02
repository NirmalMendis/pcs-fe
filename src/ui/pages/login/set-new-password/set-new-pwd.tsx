import { Button, Stack, TextField } from "@mui/material";
import { InferType } from "yup";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import SetNewPasswordSchema from "./set-new-password-schema";

type SetNewPasswordSchemaType = typeof SetNewPasswordSchema;
type ForgotPwdValues = InferType<SetNewPasswordSchemaType>;

const SetNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useCustomHookForm<SetNewPasswordSchemaType>(SetNewPasswordSchema);

  const onSubmit = (data: ForgotPwdValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2} width={400}>
        <TextField
          label="NewPassword"
          type="password"
          {...register("newPassword")}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />
        <TextField
          label="ConfirmPassword"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Set Password
        </Button>
      </Stack>
    </form>
  );
};

export default SetNewPasswordForm;
