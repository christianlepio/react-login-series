import axios from 'axios'

const BASE_URL = 'http://localhost:3500'

export default axios.create({
    //set base url for the full application
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    //set base url for the full application
    baseURL: BASE_URL,
    //interceptors: going to work with the JWT tokens to refresh the token if the 
    //initial request is denied due to an expired token
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})