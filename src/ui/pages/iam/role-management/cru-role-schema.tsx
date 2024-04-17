import * as yup from "yup";

const cruRoleSchema = yup.object({
  title: yup.string().required("Please enter role title"),
  status: yup.string().required("Please select role status"),
  functions: yup.array().of(yup.object()).min(1),
});

export default cruRoleSchema;
