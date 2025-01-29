import HttpStatusCode from '../api/statusCode';

export type ResponseCommonType = {
  message?: string;
  code: HttpStatusCode;
  data?: any;
  [key: string]: any;
};
