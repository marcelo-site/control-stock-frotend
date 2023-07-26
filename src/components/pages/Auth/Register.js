import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../../context/userContext'

import styles from '../../form/Form.module.css'

import Input from "../../form/Input"
import Select from '../../layouts/Select'

function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)
    const officies = ['Admin', 'Gerente', 'Vendedor', 'Repositor']

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    function handleSelect(e) {
        setUser({ ...user, [e.target.name]: e.target.options[e.target.selectedIndex].value })
    }
    function submit(e) {
        e.preventDefault()
        user.loja = e.target.loja.value
        register(user)
    }
    return (
        <section className={styles.form_container}>
            <h1>Registro</h1>
            <form onSubmit={submit}>
                <input type='hidden' value='1' name='loja' />
                <Input
                    type='text'
                    name='name'
                    text='Nome:'
                    placeholder='Insira o seu nome'
                    handleOnChange={handleChange}
                />
                <Input
                    type='email'
                    name='email'
                    text='E-mail:'
                    placeholder='Insira o seu E-mail'
                    handleOnChange={handleChange}
                />
                <Select
                    text='Função:'
                    name='office'
                    handleChange={handleSelect}
                    options={officies}
                />
                <Input
                    type='password'
                    name='password'
                    text='Senha:'
                    placeholder='Insira o sua senha'
                    handleOnChange={handleChange}
                />
                <Input
                    type='password'
                    name='confirmpassword'
                    text='Confirmação de senha:'
                    placeholder='Confirme a sua senha'
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Registrar" />
            </form>
            <p>Já tem uma conta? <Link to='/login'>Clique aqui.</Link></p>
        </section>
    )
}

export default Register