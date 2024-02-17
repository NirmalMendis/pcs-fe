import { Item } from "./item";

export interface PawnTicket {
  id: number;
  customerId: number;
  status: string;
  interestRate: number;
  principalAmount: number;
  dueDate: Date;
  pawnDate: Date;
  branchId: number;
  items: Array<Item>;
}
