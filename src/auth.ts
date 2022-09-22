import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:5000/v1/account',
    headers: {
        'Content-Type': 'application/json'
    }
})