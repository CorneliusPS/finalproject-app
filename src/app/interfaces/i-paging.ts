export interface IPaging<T> {
  next: number;
  previous: number;
  totalPages: number;
  count: number;
  results: T[];
}
