export interface IOrder {
  id: number;
  customerId: number;
  item: number;
  qty: number;
  state: string;
  created: Date;
  updated: Date;
}