import { Component, OnInit } from '@angular/core';
import { ICusotmer } from 'src/app/interfaces/i-cusotmer';
import { IPaging } from 'src/app/interfaces/i-paging';
import { Paging } from 'src/app/models/paging';
import { CustomerService } from 'src/app/services/customer.service';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  daftarCustomer: IPaging<ICusotmer> = new Paging<ICusotmer>();

  limit: number = 10;
  search: string = '';
  constructor(
    private customerService: CustomerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.onList();
  }

  onList(page: number | null = null) {
    this.loadingService.startLoading();
    this.customerService
      .getAllCustomer({ page, search: this.search, limit: this.limit })
      .subscribe((response: IPaging<ICusotmer>) => {
        this.daftarCustomer = response;
        this.loadingService.stopLoading();
      });
  }

  onPaginate(page: number | null) {
    this.onList(page);
  }

  onSuccessCreate(customer: ICusotmer) {
    this.onList();
  }

  onSuccessUpdate(customer: ICusotmer) {
    this.onList();
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.value) {
        this.customerService.deleteCustomer(id).subscribe(() => {
          this.onList();
          Swal.fire('Success!', 'Data berhasil dihapus.', 'success');
        });
      }
    });
  }

  onDeleteAll() {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.value) {
        this.customerService.deleteAll().subscribe(() => {
          this.onList();
          Swal.fire('Success!', 'Data berhasil dihapus.', 'success');
        });
      }
    });
  }
}
