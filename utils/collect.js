const syntax = /^(\w+)=(\w+)$/;

const validate = (keyval) => syntax.test(keyval);

export function collect(keyval, pairs) {
  if (validate(keyval)) {
    pairs.push(keyval);
    return pairs;
  }
  throw new Error(`key value pair "${keyval}" has incorrect syntax`);
}
