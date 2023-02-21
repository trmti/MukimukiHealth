import { foodDetail, nutritionTypes } from './types';

export const getSum = (foods: foodDetail[], type: nutritionTypes) => {
  const init = 0;
  const res = foods.reduce((sum, current) => {
    // @ts-ignore
    return sum + current[type];
  }, init);
  return res;
};
