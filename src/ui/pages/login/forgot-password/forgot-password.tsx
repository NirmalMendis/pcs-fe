import {
  Box,
  Button,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { InferType } from "yup";
import usePostForgotPassword from "../../../../api/auth/use-post-forgot-password";
import ForgotPasswordImg from "../../../../assets/svg/forgot-password.svg";
import Backdrop from "../../../../shared/components/backdrop";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import AuthContainer from "../auth-container";
import forgotPwdSchema from "./forgot-password-schema";

type ForgotPwdSchemaType = typeof forgotPwdSchema;
type ForgotPwdValues = InferType<ForgotPwdSchemaType>;

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useCustomHookForm<ForgotPwdSchemaType>(forgotPwdSchema);

  const {
    mutate: mutatePostForgotPassword,
    isPending: isPendingPostForgotPassword,
  } = usePostForgotPassword();

  const [isEmailSent, setIsEmailSet] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const containerRef = useRef<HTMLDivElement>(null);

  const onSubmit = (data: ForgotPwdValues) => {
    mutatePostForgotPassword(
      {
        payload: data,
      },
      {
        onSuccess: () => {
          if (isEmailSent)
            enqueueSnackbar(`Verification email sent`, {
              variant: "success",
            });
          setIsEmailSet(true);
        },
      }
    );
  };

  return (
    <AuthContainer title="Set new password">
      <Box
        ref={containerRef}
        sx={{ overflow: "hidden" }}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Slide
          in={true}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
          direction="right"
          timeout={1000}
        >
          {!isEmailSent ? (
            <Stack spacing={2}>
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
                disabled={!isValid || isPendingPostForgotPassword}
              >
                Submit
              </Button>
            </Stack>
          ) : (
            <Stack spacing={3} justifyContent={"center"} alignItems={"center"}>
              <Typography>
                We have sent you an email with instructions to reset your
                password. Please log onto your email and continue with the next
                steps.
              </Typography>
              <img src={ForgotPasswordImg} width={180} />
              <Box width={"100%"}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isPendingPostForgotPassword}
                >
                  Resend Email
                </Button>
              </Box>
            </Stack>
          )}
        </Slide>
      </Box>
      <Backdrop open={isPendingPostForgotPassword} />
    </AuthContainer>
  );
};

export default ForgotPassword;
