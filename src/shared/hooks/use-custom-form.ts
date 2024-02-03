import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import * as yup from "yup";

export const useCustomHookForm = <T extends yup.AnyObjectSchema>(
  schema: yup.AnyObjectSchema,
  props?: UseFormProps<yup.Asserts<T>>
): UseFormReturn<yup.Asserts<T>> => {
  const customUseForm = useForm<T>({
    resolver: yupResolver(schema),
    ...props,
  });

  return customUseForm;
};
