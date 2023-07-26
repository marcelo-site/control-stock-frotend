import { useState, useEffect } from "react";
import ProductForm from "../../form/ProductForm";
import api from "../../../utils/api"
import { useParams } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";

function EditProduct() {
    const [token] = useState(localStorage.getItem('token') || '')
    const [product, setProduct] = useState(undefined)
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    const [msgText, setMsgText] = useState('')
    const [msgType, setMsgType] = useState('sucess')

    useEffect(() => {
        api.get(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setProduct(response.data)
        }).catch(error => { navigate('/') })
    }, [id, token, navigate,])
    function submit(product) {
        const formData = new FormData()

        Object.keys(product).map(key => {
            return formData.append(key, product[key])
        })

        api.patch(`/products/edit/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setMsgText('sucess')
        }).catch(error => {
            setMsgType('error')
            if (error.response.status === 500) {
                setMsgText(error.response.statusText)
            } else {
                setMsgText(error.response.data.message)
            }
        })
        setFlashMessage(msgText, msgType)
    }
    return (
        <ProductForm handleSubmit={submit}
            productData={product}
            btnText="Editar" />
    )
}

export default EditProduct