import { TextField, TextFieldProps } from "@mui/material";
import React, { forwardRef } from "react";
import { ChangeHandler } from "react-hook-form";
import {
  NumericFormat,
  NumericFormatProps,
  useNumericFormat,
} from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  onBlur: ChangeHandler;
  name: string;
  customPrefix?: string;
  customSuffix?: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, customPrefix, customSuffix, onBlur, ...other } = props;
    const { removeFormatting } = useNumericFormat(props);
    const prefix = customPrefix ? `${customPrefix} ` : undefined;
    const suffix = customSuffix ? ` ${customSuffix}` : undefined;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        onBlur={(e) => {
          if (prefix && e.target.value && e.target.value.split(prefix)[1])
            e.target.value = removeFormatting
              ? removeFormatting(e.target.value.split(prefix)[1])
              : "";
          if (suffix && e.target.value && e.target.value.split(suffix)[0])
            e.target.value = removeFormatting
              ? removeFormatting(e.target.value.split(suffix)[0])
              : "";
          onBlur(e);
        }}
        thousandSeparator
        prefix={prefix}
        suffix={suffix}
      />
    );
  }
);

type NumberFieldProps = {
  customPrefix?: string;
  customSuffix?: string;
} & Omit<TextFieldProps, "variant" | "prefix">;
// eslint-disable-next-line react/display-name
const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(
  (props, ref) => {
    const { InputProps, customPrefix, customSuffix } = props;

    return (
      <TextField
        ref={ref}
        {...props}
        InputProps={{
          ...InputProps,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent: NumericFormatCustom as any,
          inputProps: {
            customPrefix,
            customSuffix,
            ...InputProps?.inputProps,
          },
        }}
      />
    );
  }
);

export default NumberField;
