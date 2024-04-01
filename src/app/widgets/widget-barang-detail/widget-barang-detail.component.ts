import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBarang } from 'src/app/interfaces/i-barang';

import { BarangService } from 'src/app/services/barang.service';
import Swal from 'sweetalert2';
import { IBarangz } from 'src/app/interfaces/i-barangz';
import { Barangz } from 'src/app/models/barangz';
import { ResponseList } from 'src/app/models/response-list';
import { IResponseList } from 'src/app/interfaces/i-response-list';

@Component({
  selector: 'app-widget-barang-detail',
  templateUrl: './widget-barang-detail.component.html',
  styleUrls: ['./widget-barang-detail.component.css'],
})
export class WidgetBarangDetailComponent {
  @Input() id: number = 0;
  @Output() onSuccess: EventEmitter<IBarangz> = new EventEmitter();
  barang: IResponseList<IBarangz> = new ResponseList<IBarangz>();

  constructor(
    private modalService: NgbModal,
    private barangService: BarangService,
    private router: Router
  ) {}

  onDetail() {
    this.barangService
      .getBarangById(this.id)
      .subscribe((response: ResponseList<IBarangz>) => {
        this.barang = response;
      });
  }
  onUpdate() {
    this.barangService
      .updateBarang(this.id, this.barang.data[0])
      .subscribe((response: IBarangz) => {
        Swal.fire({
          title: 'Success!',
          text: `Data ${response.namaBarang} berhasil diubah.`,
          icon: 'success',
        }).then(() => {
          this.onSuccess.emit(response);
        });
      });
  }

  open(content: TemplateRef<any>) {
    this.onDetail();
    this.modalService.open(content, { centered: true }).result.then(() => {});
  }
}
