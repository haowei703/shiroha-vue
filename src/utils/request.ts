import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export default request
