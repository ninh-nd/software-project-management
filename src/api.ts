import * as dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
const API_BASE_URL = process.env.API_BASE_URL
export default axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})