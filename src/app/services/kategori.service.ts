import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IKategori } from '../interfaces/i-kategori';
import { UserService } from './user.service';
import { environment } from '../environments/environment';
import { IResponseList } from '../interfaces/i-response-list';

@Injectable({
  providedIn: 'root',
})
export class KategoriService {
  constructor(
    private httpCLient: HttpClient,
    private userService: UserService
  ) {}

  getAllKategoriBarang(): Observable<IResponseList<IKategori>> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.userService.getToken()}`,
    };
    return this.httpCLient.get<IResponseList<IKategori>>(
      `${environment.baseUrl}/api/kategori-mgmnt/v1/kategori-barang`,
      {
        headers,
      }
    );
  }
}
