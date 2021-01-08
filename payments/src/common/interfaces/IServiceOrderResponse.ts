import { IOrder } from "./IOrder";

export interface IServiceOrderResponse {
  status: number;
  message?: string;
  order?: IOrder;
  error?: string;
}