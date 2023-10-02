import { sep } from 'path';

/**
 * helper to replace windows separator '\' with '/'
 * @param {string} filepath
 * @returns {string} asdf
 */
export function normalize(filepath) {
  return sep === '\\' ? filepath.replace(/\\/g, '/') : filepath;
}
