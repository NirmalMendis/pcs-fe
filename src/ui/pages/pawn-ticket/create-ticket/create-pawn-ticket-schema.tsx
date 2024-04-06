import * as yup from "yup";
import { MAXIMUM_PRICE_VALUE } from "../../../../constants/generic-constants";

const createPawnTicketSchema = yup.object({
  pawnDate: yup.date().required("Please enter the pawn date."),
  dueDate: yup.date().required("Please enter the due date."),
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
  principalAmount: yup
    .number()
    .positive("Number must be positive")
    .typeError("Please enter a number value"),
  interestRate: yup
    .number()
    .moreThan(-1, "Number must be positive")
    .max(100, `Number must be less than or equal to ${100}`)
    .required("Please enter the interest rate.")
    .typeError("Please enter a number value"),
  customerId: yup
    .number()
    .positive("Number must be positive")
    .required("Please select or register the customer")
    .typeError("Please select or register the customer"),
});

export default createPawnTicketSchema;
