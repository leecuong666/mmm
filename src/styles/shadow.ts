export const shadow = (
  x: number = 1.5,
  y: number = 2.5,
  blur: number = 7,
  dis: number = 0.5,
  color: string = 'rgba(0, 0, 0, 0.4)',
) => {
  'worklet';
  return `${x} ${y} ${blur} ${dis} ${color}`;
};
