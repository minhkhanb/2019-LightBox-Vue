require('nativescript-localstorage');

/**
 * Find an item from Storage by key
 * @param {String} key
 * @returns {Promise} return a Promise
 */

export const loadData = key => localStorage.getItem(key);

/**
 * Set an item to Storage by key
 * @param {String} key
 * @param {any} data
 * @returns {Promise} return a Promise
 */
export const saveData = (key, data) => localStorage.setItem(key, data);

export const clearData = key => localStorage.removeItem(key);

export default {
  loadData,
  saveData,
  clearData
};