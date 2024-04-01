import { IKategori } from './i-kategori';

export interface IBarangz {
  readonly idBarang?: number;
  kodeBarang: string;
  namaBarang: string;
  hargaBarang: number;
  stokBarang: number;
  statusBarang: string;
  deskripsiBarang: string;
  kategoriBarang: IKategori;
  active: boolean;
}

export interface IBarangResponse {
  status: number;
  message: string;
  data: IBarangz;
}
