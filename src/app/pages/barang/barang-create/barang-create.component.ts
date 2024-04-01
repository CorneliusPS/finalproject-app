import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IBarang } from 'src/app/interfaces/i-barang';
import { IBarangz } from 'src/app/interfaces/i-barangz';
import { Barang } from 'src/app/models/barang';
import { Barangz } from 'src/app/models/barangz';
import { BarangService } from 'src/app/services/barang.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barang-create',
  templateUrl: './barang-create.component.html',
  styleUrls: ['./barang-create.component.css'],
})
export class BarangCreateComponent {
  barang: IBarangz = new Barangz();
  statusOptions: any = ['AVAILABLE', 'NOT_AVAILABLE'];
  kategoriOptions: any = [];
  constructor(private barangService: BarangService, private router: Router) {}

  onCreate() {
    this.barangService
      .createBarang(this.barang)
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
        Swal.fire({
          title: 'Success!',
          text: `Data ${response.namaBarang} berhasil ditambahkan.`,
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/main/barang']);
        });
      });
  }
}
