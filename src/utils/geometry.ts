import type {SkRect} from '@shopify/react-native-skia';
import {
  fitbox,
  processTransform2d,
  rect,
  Skia,
} from '@shopify/react-native-skia';

export const fitRect = (src: SkRect, dst: SkRect) =>
  processTransform2d(fitbox('contain', src, dst));

export const prepare = (
  x: number = 0,
  y: number = 0,
  width: number,
  height: number,
  svg: string,
) => {
  const path = Skia.Path.MakeFromSVGString(svg);
  const src = path!.computeTightBounds();
  const dst = rect(x, y, width, height);
  const m3 = fitRect(src, dst);

  path?.transform(m3);

  return {path, totalLength: 0, lines: []};
};
