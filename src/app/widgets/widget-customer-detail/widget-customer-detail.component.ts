import { Customer } from 'src/app/models/customer';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICusotmer } from 'src/app/interfaces/i-cusotmer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-widget-customer-detail',
  templateUrl: './widget-customer-detail.component.html',
  styleUrls: ['./widget-customer-detail.component.css'],
})
export class WidgetCustomerDetailComponent {
  customer: ICusotmer = new Customer();
  @Input() id: string = '';
  @Output() onSuccess: EventEmitter<ICusotmer> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService,
    private router: Router
  ) {}

  onDetail() {
    this.customerService
      .getCustomerById(this.id)
      .subscribe((response: ICusotmer) => {
        this.customer = response;
      });
  }
  onUpdate() {
    this.customerService
      .updateCustomer(this.id, this.customer)
      .subscribe((response: ICusotmer) => {
        Swal.fire({
          title: 'Success!',
          text: `Data ${response.nama} berhasil diubah.`,
          icon: 'success',
        }).then(() => {
          this.onSuccess.emit(response);
        });
      });
  }

  open(content: any) {
    this.onDetail();
    this.modalService.open(content, { centered: true }).result.then(() => {});
  }
}
