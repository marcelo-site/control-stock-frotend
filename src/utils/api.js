import axios from 'axios'

const api = axios.create({
    baseURL: 'https://control-stock-backend-production.up.railway.app' 
})

export default api