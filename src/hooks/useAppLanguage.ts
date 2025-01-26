import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomTypeOptions} from 'i18next';
import {KeyPaths} from '../utils/type';

type CommonKeys = KeyPaths<CustomTypeOptions['resources']['common']>;

const useAppLanguage = <T>(key: CommonKeys) => {
  const {t} = useTranslation('common');

  const language = useMemo(
    () =>
      t<T>(key, {
        returnObjects: true,
      }),
    [t, key],
  );

  return language as T;
};

export default useAppLanguage;
