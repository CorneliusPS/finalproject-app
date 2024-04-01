import { LoadingService } from 'src/app/services/loading.service';
import { BarangService } from './../../../services/barang.service';
import { Component, OnInit } from '@angular/core';
import { IPaging } from 'src/app/interfaces/i-paging';
import { Paging } from 'src/app/models/paging';
import Swal from 'sweetalert2';
import { IBarangz } from 'src/app/interfaces/i-barangz';
import { IResponseList } from 'src/app/interfaces/i-response-list';
import { ResponseList } from 'src/app/models/response-list';

@Component({
  selector: 'app-barang-list',
  templateUrl: './barang-list.component.html',
  styleUrls: ['./barang-list.component.css'],
})
export class BarangListComponent implements OnInit {
  daftarBarang: IResponseList<IBarangz> = new ResponseList<IBarangz>();

  limit: number = 10;
  search: string = '';

  constructor(
    private barangService: BarangService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.onList();
  }
  onList(page: number | null = null) {
    this.loadingService.startLoading();

    this.barangService
      .getAllBarang()
      .subscribe((response: IResponseList<IBarangz>) => {
        this.daftarBarang = response;
        console.log(this.daftarBarang);
        this.loadingService.stopLoading();
      });
  }
  onPaginate(page: number | null) {
    this.onList(page);
  }
  onSuccessCreate(customer: IBarangz) {
    this.onList();
  }

  onSuccessUpdate(barang: IBarangz) {
    console.log(barang.idBarang);
    this.onList();
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.value) {
        this.barangService.deleteBarang(id).subscribe(() => {
          this.onList();
          Swal.fire('Success!', 'Data berhasil dihapus.', 'success');
        });
      }
    });
  }
}
