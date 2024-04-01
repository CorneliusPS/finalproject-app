import { IResponseList } from './../../interfaces/i-response-list';
// import { IKategori } from './../../interfaces/i-kategori';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { catchError, throwError } from 'rxjs';
// import { IBarangz } from 'src/app/interfaces/i-barangz';
// import { Barangz } from 'src/app/models/barangz';
// import { Kategori } from 'src/app/models/kategori';
// import { BarangService } from 'src/app/services/barang.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-widget-barang-create',
//   templateUrl: './widget-barang-create.component.html',
//   styleUrls: ['./widget-barang-create.component.css'],
// })
// export class WidgetBarangCreateComponent {
//   barangz: IBarangz = new Barangz();
//   kategoriBarang: IKategori = new Kategori();

//   @Output() onSuccess: EventEmitter<IBarangz> = new EventEmitter();

//   constructor(
//     private modalService: NgbModal,
//     private barangService: BarangService
//   ) {}

//   onDetail() {
//     this.barangService
//       .getAllKategoriBarang()
//       .subscribe((response: IKategori) => {
//         this.kategoriBarang = response;
//       });
//   }

//   onCreate() {
//     this.barangService
//       .createBarang(this.barangz)
//       .pipe(
//         catchError((error: HttpErrorResponse) => {
//           Swal.fire({
//             title: 'Error!',
//             text: 'Data tidak boleh kosong',
//             icon: 'error',
//           });
//           return throwError(() => new Error(error.error.detail));
//         })
//       )
//       .subscribe((response: IBarangz) => {
//         this.onSuccess.emit(response);
//         this.barangz = new Barangz();
//         Swal.fire({
//           title: 'Success!',
//           text: `Data ${response.namaBarang} berhasil ditambahkan.`,
//           icon: 'success',
//         }).then(() => {});
//       });
//   }

//   open(content: TemplateRef<any>) {
//     this.modalService
//       .open(content, { centered: true })
//       .result.then((reason) => {
//         this.barangz = new Barangz();
//       });
//   }
// }

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, throwError } from 'rxjs';
import { IBarangz } from 'src/app/interfaces/i-barangz';
import { IKategori } from 'src/app/interfaces/i-kategori'; // Pastikan interface sesuai
import { Barangz } from 'src/app/models/barangz';
import { ResponseList } from 'src/app/models/response-list';
import { BarangService } from 'src/app/services/barang.service';
import { KategoriService } from 'src/app/services/kategori.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-widget-barang-create',
  templateUrl: './widget-barang-create.component.html',
  styleUrls: ['./widget-barang-create.component.css'],
})
export class WidgetBarangCreateComponent {
  barangz: IBarangz = new Barangz();
  kategoriBarangs: IResponseList<IKategori> = new ResponseList<IKategori>(); // Modify the parameter type to IKategori

  @Output() onSuccess: EventEmitter<IBarangz> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private barangService: BarangService,
    private kategoriService: KategoriService // Tambahkan kategoriService
  ) {
    this.loadKategoriBarang(); // Memuat kategori barang saat komponen diinisialisasi
    console.log(this.kategoriBarangs);
  }

  loadKategoriBarang() {
    this.kategoriService.getAllKategoriBarang().subscribe(
      (response: IResponseList<IKategori>) => {
        this.kategoriBarangs = response;
      },
      (error: HttpErrorResponse) => {
        Swal.fire(
          'Error',
          'Terjadi kesalahan saat memuat kategori barang',
          'error'
        );
      }
    );
  }

  // onCreate() {
  //   // Get the selected category name from the user
  //   const selectedKategori = this.kategoriBarangs.data.find(
  //     (kategori: IKategori) =>
  //       kategori.idKategori === this.barangz.kategoriBarang.idKategori
  //   );

  //   if (!selectedKategori) {
  //     // Category not found, display an error message
  //     Swal.fire('Error', 'Kategori barang tidak valid', 'error');
  //     return;
  //   }

  //   // Set id_kategori on barangz according to the found category id
  //   this.barangz.kategoriBarang = selectedKategori;

  //   // Send the barang to the backend
  //   this.barangService
  //     .createBarang(this.barangz)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         Swal.fire(
  //           'Error',
  //           'Terjadi kesalahan saat menambahkan barang',
  //           'error'
  //         );
  //         return throwError(() => new Error(error.message));
  //       })
  //     )
  //     .subscribe({
  //       next: (response: IBarangz) => {
  //         this.onSuccess.emit(response);
  //         this.barangz = new Barangz(); // Reset form
  //         Swal.fire(
  //           'Berhasil',
  //           `Barang ${response.namaBarang} berhasil ditambahkan.`,
  //           'success'
  //         );
  //       },
  //       error: () => {
  //         // Handle error when sending data to the backend
  //         Swal.fire('Error', 'Gagal menambahkan barang', 'error');
  //       },
  //     });
  // }

  onCreate() {
    const selectedKategori = this.kategoriBarangs.data.find(
      (kategori: IKategori) =>
        kategori.idKategori === this.barangz.kategoriBarang?.idKategori
    );

    if (!selectedKategori) {
      // Category not found, display an error message
      Swal.fire('Error', 'Kategori barang tidak valid', 'error');
      return;
    }

    // Set id_kategori on barangz according to the found category id
    this.barangz.kategoriBarang = selectedKategori;

    const barangToAdd: IBarangz = {
      idBarang: this.barangz.idBarang,
      namaBarang: this.barangz.namaBarang,
      hargaBarang: this.barangz.hargaBarang,
      kategoriBarang: this.barangz.kategoriBarang,
      kodeBarang: this.barangz.kodeBarang,
      statusBarang: this.barangz.statusBarang,
      stokBarang: this.barangz.stokBarang,
      deskripsiBarang: this.barangz.deskripsiBarang,
      active: true,
    };

    this.barangService
      .createBarang(barangToAdd)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error!',
            text: 'Data tidak boleh kosong',
            icon: 'error',
          });
          return throwError(() => new Error(error.error.detail));
        })
      )
      .subscribe((response: IBarangz) => {
        this.onSuccess.emit(response);
        this.barangz = new Barangz();
        Swal.fire({
          title: 'Success!',
          text: `Data ${response.namaBarang} berhasil ditambahkan.`,
          icon: 'success',
        }).then(() => {});
      });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true }).result.then(
      () => {
        this.barangz = new Barangz(); // Reset form jika modal ditutup
      },
      () => {
        this.barangz = new Barangz(); // Reset form jika modal ditutup
      }
    );
  }
}
