import * as yup from "yup";
import {
  MAXIMUM_PERIOD_VALUE,
  MAXIMUM_PRICE_VALUE,
} from "../../../../constants/generic-constants";

const instantCalculatorSchema = yup.object({
  items: yup.array().of(
    yup.object().shape({
      pawningAmount: yup
        .number()
        .max(
          MAXIMUM_PRICE_VALUE,
          `Number must be less than or equal to ${MAXIMUM_PRICE_VALUE}`
        )
        .typeError("Please enter a number value"),
    })
  ),
  pawnDate: yup.date().required("Please enter the pawn date."),
  periodQuantity: yup
    .number()
    .positive("Number must be positive")
    .max(
      MAXIMUM_PERIOD_VALUE,
      `Number must be less than or equal to ${MAXIMUM_PERIOD_VALUE}`
    )
    .typeError("Please enter a number value"),
  periodType: yup.string().required("Please select a value"),
  interestRate: yup
    .number()
    .moreThan(-1, "Number must be positive")
    .max(100, `Number must be less than or equal to ${100}`)
    .required("Please enter the interest rate.")
    .typeError("Please enter a number value"),
  principalAmount: yup
    .number()
    .positive("Number must be positive")
    .required()
    .typeError("Please enter a number value"),
  serviceCharge: yup
    .number()
    .moreThan(-1, "Number must be positive")
    .max(
      MAXIMUM_PRICE_VALUE,
      `Number must be less than or equal to ${MAXIMUM_PRICE_VALUE}`
    )
    .typeError("Please enter a number value")
    .nullable()
    .transform((_, val) => (val ? Number(val) : null))
    .test(
      "serviceCharge",
      "Service charge must be less than principal amount",
      function (value) {
        const { principalAmount } = this.parent;
        if (value && principalAmount && value >= principalAmount) {
          return this.createError({
            message: "Service charge must be less than principal amount",
            path: "serviceCharge",
          });
        }
        return true;
      }
    ),
});

export default instantCalculatorSchema;
