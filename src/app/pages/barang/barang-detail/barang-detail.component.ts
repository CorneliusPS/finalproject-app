import { IBarang } from 'src/app/interfaces/i-barang';
import { Barang } from './../../../models/barang';
import { Component } from '@angular/core';

@Component({
  selector: 'app-barang-detail',
  templateUrl: './barang-detail.component.html',
  styleUrls: ['./barang-detail.component.css'],
})
export class BarangDetailComponent {
  Barang: IBarang = new Barang();

}
