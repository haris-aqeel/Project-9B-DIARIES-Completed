import axios, { AxiosResponse, AxiosError } from 'axios';
import {showAlert} from '../../Utility/utill'


const http = axios.create({
    baseURL: 'https://diaries.app',
})

http.defaults.headers.post['Content-Type'] = 'application/json';


//console.log(http.defaults)
// Returns a Object containing Details
// adapter: ƒ xhrAdapter(config)
// baseURL: "https://diaries.app"
// headers:
    // common: {Accept: "application/json, text/plain, */*"}
    // delete: {}
    // get: {}
    // head: {}
    // patch: {Content-Type: "application/x-www-form-urlencoded"}
    // post: {Content-Type: "application/json"}
    // put: {Content-Type: "application/x-www-form-urlencoded"}


// console.log(http.interceptors)
// Returns objects Response & Request with use methods 





http.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  },
  (error: AxiosError) => {
    const { response, request } = error;
    if (response) {
      if (response.status >= 400 && response.status < 500) {
       showAlert(response.data?.data?.message, 'error');
        return null;
      }
    } else if (request) {
      showAlert('Request failed. Please try again.', 'error');
      return null;
    }
    return Promise.reject(error);
  }
);

export default http;