import { ICusotmer } from '../interfaces/i-cusotmer';
import { IItem, IOrder } from '../interfaces/i-order';
import { Customer } from './customer';

export class Order implements IOrder {
  readonly _id?: string = '';
  nomor: string = '';
  customer: ICusotmer = new Customer();
  tanggal: string = '';
  dibayar: number = 0;
  total: number = 0;
  items: IItem[] = [];
}
