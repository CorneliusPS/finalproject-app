import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IPaging } from '../interfaces/i-paging';
import { ICusotmer } from '../interfaces/i-cusotmer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  getAllCustomer(params: any = {}): Observable<IPaging<ICusotmer>> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };
    return this.httpClient.get<IPaging<ICusotmer>>(
      `${environment.baseUrl}/customer/`,
      {
        headers,
        params,
      }
    );
  }

  getCustomerById(id: string): Observable<ICusotmer> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };
    return this.httpClient.get<ICusotmer>(
      `${environment.baseUrl}/customer/${id}`,
      {
        headers,
      }
    );
  }

  createCustomer(data: ICusotmer): Observable<ICusotmer> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };
    return this.httpClient.post<ICusotmer>(
      `${environment.baseUrl}/customer/`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }

  updateCustomer(id: string, data: ICusotmer): Observable<ICusotmer> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };
    return this.httpClient.put<ICusotmer>(
      `${environment.baseUrl}/customer/${id}`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }

  deleteCustomer(id: string): Observable<ICusotmer> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };
    return this.httpClient.delete<ICusotmer>(
      `${environment.baseUrl}/customer/${id}`,
      {
        headers,
      }
    );
  }

  deleteAll(): Observable<ICusotmer> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };
    return this.httpClient.delete<ICusotmer>(
      `${environment.baseUrl}/customer/`,
      {
        headers,
      }
    );
  }

  getCustomerByNomor(nomor: string): Observable<ICusotmer> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };
    return this.httpClient.get<ICusotmer>(
      `${environment.baseUrl}/customer/find/${nomor}`,
      {
        headers,
      }
    );
  }
}
