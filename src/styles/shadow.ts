export const shadow = (
  x: number = 1,
  y: number = 1,
  blur: number = 8,
  dis: number = 1,
  color: string = 'rgba(0, 0, 0, 0.4)',
) => {
  return `${x} ${y} ${blur} ${dis} ${color}`;
};
