export const isObject = (value) => value !== null && typeof value === 'object';
export const isFunction = (value) => typeof value === 'function';
export const isString = (value) => typeof value === 'string';
export const isBoolean = (value) => typeof value === 'boolean';
export const isNumber = (value) => typeof value === 'number';
export const isUndef = (value) => typeof value === 'undefined';
export const chunk = (list, size = 1) => {
    if (!(list === null || list === void 0 ? void 0 : list.length))
        return [];
    const arr = [];
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
    });
    return arr;
};
