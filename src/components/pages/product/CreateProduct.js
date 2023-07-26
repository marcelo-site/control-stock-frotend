import api from "../../../utils/api";

import ProductForm from "../../form/ProductForm"; 
//hooks
import useFlashMessage from "../../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

function CreateProduct() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    async function register(product) {
        let msgType = 'sucess'
        const formData = new FormData()

        await Object.keys(product).forEach(key => {
            if (key === 'image') {
                formData.append('image', product[key])
            } else {
                formData.append(key, product[key])
            }
        })
        const data = await api.post('products/register', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
        })
            .then(response => {
                return response.data
            })
            .catch(error => {
                msgType = 'error'
                return error.response.data
            })

        setFlashMessage(data.message, msgType)
        if (msgType !== 'error') {
            navigate('/')
        }
    }

    return (
        <ProductForm handleSubmit={register} btnText='Cadastrar' />
    )
}

export default CreateProduct