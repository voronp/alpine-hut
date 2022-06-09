type Obj = { [key: string]: Obj | unknown };

export const setOptToObj = (obj:Obj, parts:string[], val:unknown) => {
  const part = parts.shift();
  if (!part) return;
  if (!parts.length) {
    obj[part] = val;
    return;
  }
  if (!obj[part]) obj[part] = {};
  setOptToObj(obj[part] as Obj, parts, val);
}

let uniqVal = 1;

export const uniqId = (prefix = '') => `${prefix}${uniqVal++}`;