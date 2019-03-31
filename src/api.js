import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {} // do not remove this, its added to add params later in the config
});

export default {
  getData(action) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.get(url);
  },
  postData(action, data) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.post(url, data);
  },
  putData(action, data) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.put(url, data);
  },
  deleteData(action) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.delete(url);
  }
};
