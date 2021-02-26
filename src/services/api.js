import axios from 'axios'

const port = ""

const instance = axios.create({
    baseURL: `http://localhost:/${port}`
})

export default instance