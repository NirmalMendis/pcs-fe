import * as yup from "yup";

const createPawnTicketSchema = yup.object({
  pawnDate: yup.date().required("Please enter the pawn date."),
  dueDate: yup.date().required("Please enter the due date."),
  serviceCharge: yup
    .number()
    .positive("Number must be positive")
    .typeError("Please enter a number value")
    .nullable()
    .transform((_, val) => (val ? Number(val) : null)),
  principalAmount: yup
    .number()
    .positive("Number must be positive")
    .typeError("Please enter a number value"),
  interestRate: yup
    .number()
    .positive("Number must be positive")
    .required("Please enter the interest rate.")
    .typeError("Please enter a number value"),
  customerId: yup
    .number()
    .positive("Number must be positive")
    .required("Please select or register the customer")
    .typeError("Please select or register the customer"),
});

export default createPawnTicketSchema;
