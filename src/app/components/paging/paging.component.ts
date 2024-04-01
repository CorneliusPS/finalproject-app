import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent {
  @Input() next: number = 0;
  @Input() previous: number = 0;
  @Output() onPaginate: EventEmitter<number> = new EventEmitter();

  btnClick: number = 0;
  constructor(private loadingService: LoadingService) {}

  onPaginateAction(page: number, status: number) {
    this.btnClick = status;
    this.onPaginate.emit(page);
  }

  isLoading() {
    return this.loadingService.isLoading();
  }
}
