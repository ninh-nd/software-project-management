import axios from 'axios';
export default axios.create({
    baseURL: 'https://dashboard-api.up.railway.app/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
})