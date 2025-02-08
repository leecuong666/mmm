import {ChartData} from '../types/chart';
import {getRandomNum} from '../utils/number';

export const data: ChartData[] = [
  {
    label: 'Sun',
    value: getRandomNum(1, 100),
  },
  {
    label: 'Mon',
    value: getRandomNum(1, 100),
  },
  {
    label: 'Tue',
    value: getRandomNum(1, 100),
  },
  {
    label: 'Wed',
    value: getRandomNum(1, 100),
  },
  {
    label: 'Thu',
    value: getRandomNum(1, 100),
  },
  {
    label: 'Fri',
    value: getRandomNum(1, 100),
  },
  {
    label: 'Sat',
    value: getRandomNum(1, 100),
  },
];
