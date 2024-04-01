export interface IProduct {
  readonly id?: number;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
}
