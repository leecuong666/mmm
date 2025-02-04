declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof en;
    };
  }
}
