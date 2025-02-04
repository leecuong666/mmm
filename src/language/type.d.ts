import en from '../assets/languages/english.json';

export type IntroduceLng = {
  introduceList: {
    title: string;
    content: string;
  }[];
  button: {back: string; next: string};
};

export type SignInLng = {
  button: {signin: string; singup: string};
  form: {name: string; email: string; passwrod: string};
  privacy: string;
  formAlert: {
    emailAlert: string;
    passwordAlert: string;
    nameAlert: string;
  };
};
