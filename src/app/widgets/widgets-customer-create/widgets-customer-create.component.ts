import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, throwError } from 'rxjs';
import { ICusotmer } from 'src/app/interfaces/i-cusotmer';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-widgets-customer-create',
  templateUrl: './widgets-customer-create.component.html',
  styleUrls: ['./widgets-customer-create.component.css'],
})
export class WidgetsCustomerCreateComponent {
  customer: ICusotmer = new Customer();

  @Output() onSuccess: EventEmitter<ICusotmer> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService
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
        this.onSuccess.emit(response);
        this.customer = new Customer();
        Swal.fire({
          title: 'Success!',
          text: `Data ${response.nama} berhasil ditambahkan.`,
          icon: 'success',
        }).then(() => {});
      });
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { centered: true })
      .result.then((reason) => {
        this.customer = new Customer();
      });
  }
}
