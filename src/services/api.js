import axios from 'axios'
import 'dotenv'

const port = ""

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})

export default instance