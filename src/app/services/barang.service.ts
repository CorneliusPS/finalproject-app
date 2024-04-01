import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IBarang } from '../interfaces/i-barang';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { IPaging } from '../interfaces/i-paging';
import { IBarangz } from '../interfaces/i-barangz';
import { IResponseList } from '../interfaces/i-response-list';
import { IKategori } from '../interfaces/i-kategori';

@Injectable({
  providedIn: 'root',
})
export class BarangService {
  baseUrl: string = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  getAllBarang(params: any = {}): Observable<IResponseList<IBarangz>> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken()}`,
    };

    return this.httpClient.get<IResponseList<IBarangz>>(
      `${environment.baseUrl}/api/barang-mgmnt/v1/barang/`,
      {
        headers,
        params,
      }
    );
  }

  getAllKategoriBarang(): Observable<IKategori> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken()}`,
    };
    return this.httpClient.get<IKategori>(
      `${environment.baseUrl}/api/kategori-mgmnt/v1/kategori-barang`,
      {
        headers,
      }
    );
  }

  getBarangById(id: number): Observable<IResponseList<IBarangz>> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken()}`,
    };

    return this.httpClient.get<IResponseList<IBarangz>>(
      `${environment.baseUrl}/api/barang-mgmnt/v1/barang/${id}`,
      {
        headers,
      }
    );
  }

  getBarangByNomor(nomor: string): Observable<IBarangz> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };

    return this.httpClient.get<IBarangz>(
      `${environment.baseUrl}/barang/find/${nomor}`,
      {
        headers,
      }
    );
  }

  createBarang(data: IBarangz): Observable<IBarangz> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken()}`,
    };

    return this.httpClient.post<IBarangz>(
      `${environment.baseUrl}/api/barang-mgmnt/v1/barang/`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }

  updateBarang(id: number, data: IBarangz): Observable<IBarangz> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };

    return this.httpClient.put<IBarangz>(
      `${environment.baseUrl}/api/barang-mgmnt/v1/barang${id}`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }

  deleteBarang(id: number): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.userService.getToken(),
    };

    return this.httpClient.delete<any>(`${environment.baseUrl}/barang/${id}`, {
      headers,
    });
  }
}
