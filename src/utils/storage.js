const sessionStorageUtils = {
  setItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key) {
    let value = '';
    const val = sessionStorage.getItem(key);
    try {
      value = JSON.parse(val);
    } catch (err) {
      console.log('err: ', err);
    }
    return value;
  },
  clear(key) {
    key ? this.setItem(key, '') : sessionStorage.clear();
  },
};
export { sessionStorageUtils };
