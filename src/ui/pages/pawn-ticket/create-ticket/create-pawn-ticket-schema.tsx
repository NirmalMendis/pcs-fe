import * as yup from "yup";

const createPawnTicketSchema = yup.object({
  pawnDate: yup.date().required("Please enter the pawn date."),
  dueDate: yup.date().required("Please enter the due date."),
  principalAmount: yup
    .number()
    .required("Please enter the principal amount.")
    .typeError("Please enter a number value"),
  interestRate: yup
    .number()
    .required("Please enter the interest rate.")
    .typeError("Please enter a number value"),
  status: yup.string().required("Please select a status"),
  customerId: yup
    .number()
    .required("Please select or register the customer")
    .typeError("Please select or register the customer"),
});

export default createPawnTicketSchema;
