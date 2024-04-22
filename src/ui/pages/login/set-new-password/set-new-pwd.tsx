import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Slide,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { InferType } from "yup";
import usePatchSetNewPassword from "../../../../api/auth/use-patch-set-new-password";
import ROUTE_PATHS from "../../../../constants/route-paths";
import Backdrop from "../../../../shared/components/backdrop";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../../shared/hooks/use-single-field-error";
import AuthContainer from "../auth-container";
import SetNewPasswordSchema from "./set-new-password-schema";

type SetNewPasswordSchemaType = typeof SetNewPasswordSchema;
type ForgotPwdValues = InferType<SetNewPasswordSchemaType>;

const SetNewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useCustomHookForm<SetNewPasswordSchemaType>(SetNewPasswordSchema);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownNewPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  const {
    mutate: mutateSetNewPassword,
    isPending: isPendingSetNewPassword,
    isError: isErrorSetNewPassword,
  } = usePatchSetNewPassword();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: ForgotPwdValues) => {
    if (email && token)
      mutateSetNewPassword(
        {
          payload: {
            email,
            password: data.newPassword,
            resetToken: token,
          },
        },
        {
          onSuccess: () => {
            enqueueSnackbar(
              `New password has been set. Please login to continue.`,
              {
                variant: "success",
              }
            );
            navigate(ROUTE_PATHS.LOGIN);
          },
        }
      );
  };

  return (
    <AuthContainer title="Set new password">
      <Box ref={containerRef} sx={{ overflow: "hidden" }}>
        <Slide
          in={true}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
          direction="right"
          timeout={1000}
        >
          <Stack
            spacing={2}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ pt: 1 }}
          >
            <TextField
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword")}
              error={!!getSingleFieldError("newPassword")}
              helperText={getSingleFieldError("newPassword")?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              error={!!getSingleFieldError("confirmPassword")}
              helperText={getSingleFieldError("confirmPassword")?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
        </Slide>
      </Box>
      <Backdrop open={isPendingSetNewPassword && !isErrorSetNewPassword} />
    </AuthContainer>
  );
};

export default SetNewPassword;
