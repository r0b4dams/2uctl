const syntax = /^(\w+)=(\w+)$/;
const validate = (keyval) => syntax.test(keyval);

/**
 * helper to accumulate list of args entered to env command
 * each key value pair should have the form KEY=VALUE
 *
 * @param {string} keyval a key/value pair to validate and collect
 * @param {string[]} pairs accumulated list of key/value pairs
 * @returns {string[]} the list of key/value pairs
 */
export function collect(keyval, pairs) {
  if (validate(keyval)) {
    pairs.push(keyval);
    return pairs;
  }
  throw new Error(`key value pair "${keyval}" has incorrect syntax`);
}
