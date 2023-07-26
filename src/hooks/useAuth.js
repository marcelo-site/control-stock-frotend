import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setAuthenticated(true)
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }
    }, [])

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    async function register(user) {
        let msgText = 'Cadastro realizado'
        let msgType = 'sucess'
        try {
            const data = await api.post('/users/register', user)
                .then(res => {
                    return res.data
                })
            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    function logout() {
        let msgText = "Logout realizado com sucesso!"
        let msgType = 'sucess'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')
        setFlashMessage(msgText, msgType)
    }

    async function login(user){
        let msgText = "Login feito com sucesso"
        let msgType = "sucess"
        try {
          const data = await api.post('users/login', user)
            .then(response => response.data)
            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
            setFlashMessage(msgText, msgType)
        }
    }
    return { authenticated, register, login, logout}
}