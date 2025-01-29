import {accountInfo} from '../dataMockup/authen';
import {SignInType, SignUpType} from '../types/auth';
import {serverSignIn} from './mockup.sever';
import HttpStatusCode from './statusCode';

export const handleSignIn = async (credentials: SignInType) => {
  const res = await serverSignIn(credentials);

  return res;
};

export const handleSignUp = async (info: SignUpType) => {
  setTimeout(() => {
    return {
      message: 'AUTHORIZED',
      code: HttpStatusCode.OK,
      data: accountInfo,
    };
  }, 6000);
};
