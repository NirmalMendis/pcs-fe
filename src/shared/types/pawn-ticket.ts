import Customer from "./customer";

export interface PawnTicket {
  id: number;
  customerId: number;
  status: string;
  interestRate: number;
  principalAmount: number;
  serviceCharge: number;
  monthlyInterest: number;
  dueDate: Date;
  pawnDate: Date;
  periodInMonths: number;
  branchId: number;
  customer: Customer;
  invoiceId?: number;
  revision: number | null;
}
