import axios from 'axios'

export default axios.create({
    //set base url for the full application
    baseURL: 'http://localhost:3500'
})