import en from '../assets/languages/english.json';

export type CommonLng = {
  header?: {};
  body: {
    introduceList: {
      title: string;
      content: string;
    }[];
  };
  footer: {
    button: {back: string; next: string};
  };
};

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof en;
    };
  }
}
