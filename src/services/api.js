import axios from 'axios'
import 'dotenv'

const port = ""

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL
})

instance.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.REACT_APP_URL

export default instance