import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ICusotmer } from 'src/app/interfaces/i-cusotmer';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})
export class CustomerCreateComponent {
  customer: ICusotmer = new Customer();

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  onCreate() {
    this.customerService
      .createCustomer(this.customer)
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
      .subscribe((response: ICusotmer) => {
        Swal.fire({
          title: 'Success!',
          text: `Data ${response.nama} berhasil ditambahkan.`,
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/main/barang']);
        });
      });
  }
}
