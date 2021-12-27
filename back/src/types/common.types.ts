export type ResponseMsgText = 'success' | 'fail';

export interface IResponseMsg {
  message: ResponseMsgText;
  info?: any;
}
