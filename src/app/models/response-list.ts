import { IResponseList } from '../interfaces/i-response-list';

export class ResponseList<T> implements IResponseList<T> {
  data: T[];
  message: string;
  status: number;
  success: boolean;
  timestamp: string;

  constructor() {
    this.data = [];
    this.message = '';
    this.status = 0;
    this.success = false;
    this.timestamp = '';
  }
}
