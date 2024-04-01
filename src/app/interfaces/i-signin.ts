export interface ISignin {
  username: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IData {
  token: string;
}

export interface IDataResponse {
  data: IData;
  message: string;
  status: number;
  success: boolean;
}
