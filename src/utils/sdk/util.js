
// 判断是否为数组类型
export function isArray(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]'
}

// 判断是否为对象
export function isObject(arg) {
  return Object.prototype.toString.call(arg) === '[object Object]'
}

// 判断是否为函数
export function isFunction(arg) {
  return typeof arg === 'function'
}

// 合并多个对象到第一个对象
export function objectAssign(target, ...params) {
  return Object.assign(target, ...params)
}

// 给对象设置key value
export function setObjKeyValue(obj, key, value, isMerge = true) {
  if (!isObject(obj)) {
    return;
  }
  if (isMerge && isObject(value)) {
    if (!obj[key]) {
      obj[key] = {}
    }
    objectAssign(obj[key], value);
    return;
  }
  obj[key] = value;
}






