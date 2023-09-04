import axios from "axios";

export function http() {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Accept' : "application/json",
      'Content-Type' : ['application/json']
    },
  });
}

export function httpFile() {
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'multipart/form-data'
        }
    })
}