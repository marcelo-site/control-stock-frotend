import axios from 'axios'

const api = axios.create({
    baseURL: 'control-stock-backend-production.up.railway.app' 
})

export default api