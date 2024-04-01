export interface IResponseList<T> {
  data: T[];
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}
