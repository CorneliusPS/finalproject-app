import { IPaging } from '../interfaces/i-paging';

export class Paging<T> implements IPaging<T> {
  next: number;
  previous: number;
  totalPages: number;
  count: number;
  results: T[];

  constructor() {
    this.next = 0;
    this.previous = 0;
    this.totalPages = 0;
    this.count = 0;
    this.results = [];
  }
}
