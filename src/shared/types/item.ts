export interface Item {
  id: number;
  description: string;
  caratage: number;
  appraisedValue: number;
  pawningAmount: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  customerId?: number;
  pawnTicketId?: number;
  RedemptionId?: number;
}
