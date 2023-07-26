import Input from "../../form/Input";
import styles from '../../form/Form.module.css'
import { useState } from "react";

import useFlashMessage from "../../../hooks/useFlashMessage";

import api from "../../../utils/api";

function CreateColor() {
const [token] = useState(localStorage.getItem('token') || '')
    const [color, setColor] = useState({})
    const { setFlashMessage} = useFlashMessage()
    function handleChange(e) {
        setColor({ ...color, [e.target.name]: e.target.value })
    }

    async function submit(e) {
        e.preventDefault()

        let msgType = 'sucess'

        console.log(color)

        const data = await api.post('products/create-color', color, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)
    }
    return (
        <section className={styles.form_container}>
            <h2>Criar cor</h2>
            <form onSubmit={submit}>
                <Input
                    text='Nome da cor:'
                    name='name'
                    type='text'
                    placeholder='Insira o nome da cor'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Escolha a cor:'
                    name='color'
                    type='color'
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Criar cor" />
            </form>
        </section>
    )
}

export default CreateColor