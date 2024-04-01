import { IBarang } from '../interfaces/i-barang';

export class Barang implements IBarang {
  _id?: string | undefined = '';
  nomor: string = '';
  nama: string = '';
  satuan: string = '';
  hargaJual: number = 0;
  stok: number = 0;
}
