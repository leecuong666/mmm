import {ChartData} from '../types/chart';
import {getRandomNum} from '../utils/number';

export const data: ChartData[] = [
  {
    label: 'Sun',
    value: getRandomNum(0, 999),
  },
  {
    label: 'Mon',
    value: getRandomNum(0, 999),
  },
  {
    label: 'Tue',
    value: getRandomNum(0, 999),
  },
  {
    label: 'Wed',
    value: getRandomNum(0, 999),
  },
  {
    label: 'Thu',
    value: getRandomNum(0, 999),
  },
  {
    label: 'Fri',
    value: getRandomNum(0, 999),
  },
  {
    label: 'Sat',
    value: getRandomNum(0, 999),
  },
];
