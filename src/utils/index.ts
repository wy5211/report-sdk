export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === 'object';
export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === 'function';

export const isString = (value: unknown): value is string => typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined';

export const chunk = <T>(list: T[], size: number = 1) => {
  if (!list?.length) return [];
  const arr: T[][] = [];
  let index = 0;
  arr[index] = [];
  list.forEach(item => {
    if (arr[index].length < size) {
      arr[index].push(item);
    }
    if (arr[index].length === size) {
      index++;
      arr[index] = [];
      arr[index].push(item);
    }
  })

  return arr;
}