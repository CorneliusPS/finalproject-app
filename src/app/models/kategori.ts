import { IKategori } from '../interfaces/i-kategori';

export class Kategori implements IKategori {
  idKategori?: number = 0;
  kodeKategori: string = '';
  namaKategori: string = '';
  deskripsiKategori: string = '';
  statusKategori: string = '';
  active: boolean = false;
}
