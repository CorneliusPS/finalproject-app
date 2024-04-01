import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menus = [
    {
      title: 'Barang',
      mainPath: '/main/barang',
      childs: [
        { title: 'Create', mainPath: 'barang/new' },
        { title: 'Edit', mainPath: 'main/barang/edit' },
      ],
    },
    {
      title: 'Customer',
      mainPath: '/main/customer',
    },
    {
      title: 'Order',
      mainPath: '/main/order',
    },
  ];

  constructor() {}

  getMenu() {
    return this.menus;
  }
}
