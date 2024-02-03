import * as yup from "yup";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";

const schema = yup.object({
  email: yup.string(),
});

const LoginForm = () => {
  const { register } = useCustomHookForm(schema);
  return <div>LoginForm</div>;
};

export default LoginForm;
