import { IBarang } from './i-barang';
import { ICusotmer } from './i-cusotmer';

export interface IItem extends IBarang {
  qty: number;
  subtotal: number;
}
export interface IOrder {
  readonly_id?: string;
  nomor: string;
  customer: ICusotmer;
  tanggal: string;
  dibayar: number;
  total: number;
  items: IItem[];
}
