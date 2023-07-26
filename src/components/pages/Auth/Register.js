import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../../context/userContext'

import styles from '../../form/Form.module.css'

import Input from "../../form/Input"
import Select from '../../layouts/Select'

function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)
    // const [office, setOffice] = useState(undefined)
    const officies = ['Vendedor', 'Gerente', 'Repositor']

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    function handleSelect (e) {
        setUser({ ...user, [e.target.name]: e.target.options[e.target.selectedIndex].value })
    }
    function submit(e) {
        setUser({...user, loja: 1})
        e.preventDefault()
        register(user)
    }
    return (
        <section className={styles.form_container}>
            <h1>Registro</h1>
            <form onSubmit={submit}>
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
                 {/* <Input
                    type=''
                    name='office'
                    text='Cargo'
                    placeholder='Insira sua função'
                    handleOnChange={handleChange}
                /> */}
                <Select 
                text='Função:'
                name='office'
                // text=''
                handleChange={handleSelect}
                options={officies}
                // value={value || ''}
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