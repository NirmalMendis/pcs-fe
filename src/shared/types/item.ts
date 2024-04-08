export interface ItemDetailType {
  id: number;
  type: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  itemId?: number;
}

export interface Item {
  id: number;
  description: string;
  appraisedValue: number;
  pawningAmount: number;
  itemDetails?: Array<ItemDetailType>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  customerId?: number;
  pawnTicketId?: number;
  RedemptionId?: number;
}
