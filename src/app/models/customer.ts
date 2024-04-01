import { ICusotmer } from '../interfaces/i-cusotmer';

export class Customer implements ICusotmer {
  _id?: string = '';
  nomor: string = '';
  nama: string = '';
  alamat: string = '';
  telepon: string = '';
}
