import * as yup from "yup";

const SetNewPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please enter the confirm password.")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

export default SetNewPasswordSchema;
