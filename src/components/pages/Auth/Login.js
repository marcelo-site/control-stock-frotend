import { useState, useContext } from 'react'
import styles from '../../form/Form.module.css'

import Input from "../../form/Input"

import { Context } from '../../../context/userContext'

function Login() {
    const [user, setUser] = useState({})
    const { login } = useContext(Context)
    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }
    function submit(e) {
        e.preventDefault()
        login(user)
    }
    return (
        <section className={styles.form_container}>
            <h1>Registro</h1>
            <form onSubmit={submit}>
                <Input
                    type='email'
                    name='email'
                    text='E-mail:'
                    placeholder='Insira o seu E-mail'
                    handleOnChange={handleChange}
                />
                <Input
                    type='password'
                    name='password'
                    text='Senha:'
                    placeholder='Insira o sua senha'
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar"/>
            </form>
        </section>
    )
}

export default Login