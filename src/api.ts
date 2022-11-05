import axios from 'axios';
export default axios.create({
    baseURL: process.env.API_ENDPOINT || 'http://localhost:3001/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
})