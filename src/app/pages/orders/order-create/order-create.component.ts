import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICusotmer } from 'src/app/interfaces/i-cusotmer';
import { IItem, IOrder } from 'src/app/interfaces/i-order';
import { Order } from 'src/app/models/order';
import { BarangService } from 'src/app/services/barang.service';
import { CustomerService } from 'src/app/services/customer.service';
import { IBarang } from 'src/app/interfaces/i-barang';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { IBarangz } from 'src/app/interfaces/i-barangz';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})
export class OrderCreateComponent {
  orderForm!: FormGroup;
  order: IOrder = new Order();
  kodeBarang: string = '';
  nomorCustomer: string = '';

  constructor(
    private fb: FormBuilder,
    private barangService: BarangService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      nomor: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ]),
      tanggal: new FormControl('', [Validators.required]),
      dibayar: new FormControl('', [Validators.required]),
      total: new FormControl(0, [Validators.required]),
      customer: this.fb.group({
        nomor: new FormControl('', [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
        ]),
        nama: new FormControl('', [Validators.required]),
        alamat: new FormControl('', [Validators.required]),
        telepon: new FormControl('', [Validators.required]),
      }),
      items: this.fb.array([]),
    });

    this.orderForm.valueChanges.subscribe((value: IOrder) => {
      this.order = value;
    });
  }

  newItemForm(barang: IBarangz) {
    return this.fb.group({
      _id: new FormControl(barang.idBarang, [Validators.required]),
      nomor: new FormControl(barang.kodeBarang, [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ]),
      nama: new FormControl(barang.namaBarang, [Validators.required]),
      satuan: new FormControl(barang.statusBarang, [Validators.required]),
      hargaJual: new FormControl(barang.hargaBarang, [Validators.required]),
      stok: new FormControl(barang.stokBarang, [Validators.required]),
      qty: new FormControl(1, [Validators.required]),
      subtotal: new FormControl(barang.hargaBarang * 1, [Validators.required]),
    });
  }

  getItemsForm(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  getItemForm(index: number): IItem {
    return this.getItemsForm().at(index).value;
  }

  addItemForm(barang: IBarangz) {
    this.getItemsForm().push(this.newItemForm(barang));
  }

  onCreate() {
    console.log(this.orderForm.value);
    this.orderService.createOrder(this.order).subscribe((response: IOrder) => {
      this.router.navigate(['main/order']);
    });
  }
  onFindCustomer() {
    this.customerService
      .getCustomerByNomor(this.nomorCustomer)
      .subscribe((response: ICusotmer) => {
        this.orderForm
          .get('customer')
          ?.patchValue(response, { eventEmit: true });
      });
  }

  onFindBarang() {
    this.barangService
      .getBarangByNomor(this.kodeBarang)
      .subscribe((response: IBarangz) => {
        this.addItemForm(response);
        this.calculateTotal();
      });
  }

  onQtyChange(index: number) {
    const item = this.getItemForm(index);
    const qty = item.qty;
    const hargaJual = item.hargaJual;
    const subtotal = qty * hargaJual;
    this.getItemsForm().at(index).get('subtotal')?.patchValue(subtotal);

    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    this.getItemsForm().value.forEach((item: IItem) => {
      total += item.subtotal;
    });
    this.orderForm.get('total')?.patchValue(total);
  }
}
