import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { IPaging } from '../interfaces/i-paging';
import { Observable } from 'rxjs';
import { IOrder } from '../interfaces/i-order';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  getAllOrder(params: any = {}): Observable<IPaging<IOrder>> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };

    return this.httpClient.get<IPaging<IOrder>>(
      `${environment.baseUrl}/order/`,
      {
        headers,
        params,
      }
    );
  }

  getOrderById(id: string): Observable<IOrder> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };

    return this.httpClient.get<IOrder>(`${environment.baseUrl}/order/${id}`, {
      headers,
    });
  }

  createOrder(data: IOrder): Observable<IOrder> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };

    return this.httpClient.post<IOrder>(
      `${environment.baseUrl}/order/`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }

  updateOrder(id: string, data: IOrder): Observable<IOrder> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };

    return this.httpClient.put<IOrder>(
      `${environment.baseUrl}/order/${id}`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }

  deleteOrder(id: string): Observable<IOrder> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };

    return this.httpClient.delete<IOrder>(
      `${environment.baseUrl}/order/${id}`,
      {
        headers,
      }
    );
  }
}
