const ClientStorageApi = {
  saveRecord: (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  },
  getRecord: (key: string) => {
    try {
      const record = localStorage.getItem(key);
      return record && JSON.parse(record);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

export { ClientStorageApi };
