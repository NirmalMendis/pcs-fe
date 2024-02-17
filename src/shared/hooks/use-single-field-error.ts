import { FieldErrors, FieldValues } from "react-hook-form";

const useSingleFieldError = <T extends FieldValues>(
  touchedFields: Partial<Readonly<T>>,
  errors: FieldErrors<T>
) => {
  const getSingleFieldError = (fieldName: keyof T) => {
    const error = { ...touchedFields }[fieldName]
      ? { ...errors }[fieldName]
      : undefined;
    return error;
  };
  return {
    getSingleFieldError,
  };
};

export default useSingleFieldError;
