import { Button, Stack, TextField } from "@mui/material";
import { InferType } from "yup";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import forgotPwdSchema from "./forgot-password-schema";

type ForgotPwdSchemaType = typeof forgotPwdSchema;
type ForgotPwdValues = InferType<ForgotPwdSchemaType>;

const ForgotPwdForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useCustomHookForm<ForgotPwdSchemaType>(forgotPwdSchema);

  const onSubmit = (data: ForgotPwdValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2} width={400}>
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default ForgotPwdForm;
