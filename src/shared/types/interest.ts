import { InterestStatusEnum } from "./generic";

export interface Interest {
  id: number;
  fromDate: Date;
  toDate: Date;
  amount: number;
  status: InterestStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  pawnTicketId?: number;
}
