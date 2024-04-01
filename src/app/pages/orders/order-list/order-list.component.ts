import { Component } from '@angular/core';
import { IOrder } from 'src/app/interfaces/i-order';
import { IPaging } from 'src/app/interfaces/i-paging';
import { Paging } from 'src/app/models/paging';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  orders: IPaging<IOrder> = new Paging<IOrder>();

  limit = 10;
  search: string = '';

  constructor(
    private orderService: OrderService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.onList();
  }

  onList(page: number | null = null) {
    this.loadingService.startLoading();
    this.orderService
      .getAllOrder({
        limit: this.limit,
        page,
        search: this.search,
      })
      .subscribe((response: IPaging<IOrder>) => {
        this.orders = response;
        this.loadingService.stopLoading();
      });
  }

  onPaginate(page: number | null = null) {
    this.onList(page);
  }

  onSuccess(order: IOrder) {
    this.onList();
  }
}
