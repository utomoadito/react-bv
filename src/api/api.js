import axios from 'axios'
import qs from 'qs'

const backendURL = "http://localhost:4000/"

export function api() {
  function get (endpoint) {
    return processRequest(
      axios.get(mergeEndpoint(endpoint), {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    )
  }

  function post (endpoint, payload) {
    return processRequest(
      axios.post(mergeEndpoint(endpoint), payload, {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    )
  }

  function put (endpoint, payload) {
    return processRequest(
      axios.put(mergeEndpoint(endpoint), payload, {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    )
  }

  function del (endpoint, payload) {
    return processRequest(
      axios.delete(mergeEndpoint(endpoint), payload, {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    )
  }

  function login (endpoint, payload) {
    return processRequest(
      axios.post(mergeEndpoint(endpoint), qs.stringify(payload), { //use stringify for x-www-form-urlencoded
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    )
  }

  function processRequest (request) {
    return new Promise((resolve, reject) => {
      request
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.status)
        })
    })
  }

  function mergeEndpoint (endpoint) {
    return `${backendURL}${endpoint}`
  }

  return {
    get,
    post,
    put,
    del,
    login
  }
  // const instance = axios.create({
  //   baseURL: backendURL,
  // })
  // return instance
}