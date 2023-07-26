import axios from 'axios'

const api = axios.create({
    baseURL: 'https://control-stock-frotend-production.up.railway.app' 
})

export default api