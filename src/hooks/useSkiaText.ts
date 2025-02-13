import {DataSourceParam, useFont} from '@shopify/react-native-skia';
import {useMemo} from 'react';

type Props = {
  text: string;
  fontFamily?: DataSourceParam;
  fontSize: number;
};

const useSkiaText = ({
  text,
  fontFamily = require('../assets/fonts/MazzardM-Medium.otf'),
  fontSize,
}: Props) => {
  const font = useFont(fontFamily, fontSize);
  const textSize = useMemo(() => font?.measureText(text), [font]);

  return {font, textSize};
};

export default useSkiaText;
