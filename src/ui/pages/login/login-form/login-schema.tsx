import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter your email."),
  password: yup.string().required("Please enter your password."),
});

export default loginSchema;
