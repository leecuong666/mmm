import {accountInfo, validAccount} from '../dataMockup/authen';
import {SignInType} from '../types/auth';
import {ResponseCommonType} from '../types/serverResponseForm';
import HttpStatusCode from './statusCode';

const timeout = 6000;

export const serverSignIn = ({
  email,
  password,
}: SignInType): Promise<ResponseCommonType> => {
  return new Promise(resolve => {
    if (email == validAccount.email && password == validAccount.password) {
      setTimeout(() => {
        return resolve({
          message: 'AUTHORIZED',
          code: HttpStatusCode.OK,
          data: accountInfo,
        });
      }, timeout);
    }

    setTimeout(() => {
      return resolve({
        code: HttpStatusCode.UNAUTHORIZED,
        message: 'UNAUTHORIZED',
      });
    }, timeout);
  });
};
