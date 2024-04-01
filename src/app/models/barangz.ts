import { IBarangz } from '../interfaces/i-barangz';
import { IKategori } from '../interfaces/i-kategori';
import { Kategori } from './kategori';

export class Barangz implements IBarangz {
  idBarang?: number | undefined;
  kodeBarang: string = '';
  namaBarang: string = '';
  hargaBarang: number = 0;
  stokBarang: number = 0;
  statusBarang: string = '';
  deskripsiBarang: string = '';
  kategoriBarang: IKategori = new Kategori();
  active: boolean = true;
}
