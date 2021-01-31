// import axios from 'axios'
// import {notification} from 'antd'

// const apiClient = axios.create()

// apiClient.interceptors.request.use(
//   async request => {
//     const accessToken = localStorage.getItem('jwtToken')
//     if (accessToken) {
//       request.headers = {
//         Authorization: `Bearer ${accessToken}`,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       }
//     } else {
//       request.headers = {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       }
//     }
//     return request
//   },
//   error => {
//     Promise.reject(error)
//   },
// )

// export default apiClient


import axios from "axios";

/**
 *
 * parse error response
 */
function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages: messages });
    } else {
      return Promise.reject({ messages: [messages] });
    }
  } else {
    return Promise.reject({ messages: ["error"] });
  }
}

/**
 * parse response
 */
function parseBody(response) {
  //  if (response.status === 200 && response.data.status.code === 200) { // - if use custom status code
  if (response.status === 200) {
    return response.data.result;
  } else {
    return this.parseError(response.data.messages);
  }
}

/**
 * axios instance
 */
let instance = axios.create();

// request header
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("authToken");
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    } else {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response parse
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn("Error status", error.response.status);
    // return Promise.reject(error)
    if (error.response) {
      return parseError(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
);

export const http = instance;
