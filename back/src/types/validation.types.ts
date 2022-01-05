import { ResponseMsgText } from './common.types';

export interface ValidationErrorI {
  validationProperty: string;
  validationErrors: string[];
}

export interface ValidationResponse {
  status: ResponseMsgText;
  msg?: string;
  errors?: ValidationErrorI[];
}
