import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Image from "../../layouts/Image";
import FormStock from "../../form/FormStock";
import styles from "../product/AddColorStock.module.css"

function AddColorStock() {
    const [token] = useState(localStorage.getItem('token') || '')
    const [productStorage, setProductStorage] = useState(JSON.parse(
        localStorage.getItem("product")) || '')
    const [stock, setStock] = useState({})
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [stockData, setStockData] = useState([])
    const [isReadOnly, setIsReadyOnly] = useState([])
    const [qty, setQty] = useState(0)
    const [textAtual, setTextatual] = useState([])
    // const navigate = useNavigate()

    useEffect(() => {
        api.get(`products/unique-all/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setStockData(response.data.size.map(el => false))
            setIsReadyOnly(response.data.size.map(el => false))
            setProduct(response.data)
        }).then(() => {
            const data = JSON.parse(localStorage.getItem('product'))
            if (!data || parseInt(data.id) !== parseInt(id)) {
                return api.get(`/products/${id}`)
            } else {
                return data
            }
        }).then(res => {
            localStorage.setItem('product', JSON.stringify(res))
            const data = JSON.parse(localStorage.getItem('product'))
            return data
        }).then(res => {
            if (productStorage.id !== parseInt(id) || productStorage === '') {
                return api.get(`/products/${id}`)
                    .then(response => {
                        const obj = response.data
                        localStorage.setItem('product', JSON.stringify(obj))
                        return obj
                    })
            } else {
                return res
            }
        }).then(res => {
            setProductStorage(res)
        })
            .catch(error => console.log(error))
        // eslint-disable-next-line
    }, [id, token])

    function handleChange(e, i) {
        setStockData(() => [...stockData], stockData[i] = e.target.value)
        setStock({ ...stock, [e.target.name]: e.target.value })
    }
    function isChecked(e, i) {
        const idColor = parseInt(e.target.value)
        const idSize = parseInt(e.target.getAttribute('data_size'))
        setTextatual(() => [...textAtual], textAtual[i] = 'Estoque:')

        for (let ind = 0; ind < product.stock.length; ind++) {
            const keycolor = product.stock[ind]['product_size_color.size_color.colorId']
            const keySize = product.stock[ind]['product_size_color.size_color.sizeId']

            setIsReadyOnly(() => [...isReadOnly], isReadOnly[i] = false)
            setStockData(() => [...stockData], stockData[i] = '')

            if (keycolor === idColor && keySize === idSize) {

                if (product.stock[ind].stock > 0) {
                    setTextatual(() => [...textAtual], textAtual[i] = 'Estoque atual:')
                    setIsReadyOnly(() => [...isReadOnly], isReadOnly[i] = true)
                    setStockData(() => [...stockData], stockData[i] = product.stock[ind].stock)
                    setStock({ ...stock, stockId: product.stock[ind].id })
                    break;
                }
            }
        }
    }
    async function submit(e) {
        e.preventDefault()
        const size = e.target.size
        const loja = e.target.loja
        const color = []
        document.getElementsByName('color').forEach(el => {
            if (el.checked) {
                return color.push(el.value)
            }
        })
        const stockObj = {
            stock: parseInt(stock.stock),
            lojaId: parseInt(loja.value),
            sizeId: parseInt(size.value),
            colorId: parseInt(color[0])
        }

        let msgType = 'sucess'
        if (qty > 0) {
            stockObj.stock = qty
            stockObj.id = stock.stockId

            const data = await api.patch(`/products/edit-stock/${id}`,
                stockObj,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                })
                .then(response => {
                    return response.data.message
                }).catch(error => {
                    msgType = 'error'
                    if (error.response.status === 500) {
                        return error.response.statusText
                    } else {
                        return error.response.data.message
                    }
                })
            setFlashMessage(data, msgType)
        } else {
            const data = await api.post(`products/add-stock/${id}`,
                stockObj
                , {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                })
                .then(response => {
                    return response.data.message
                }).catch(error => {
                    msgType = 'error'
                    if (error.response.status === 500) {
                        return error.response.statusText
                    } else {
                        return error.response.data.message
                    }
                })
            setFlashMessage(data, msgType)
        }
    }
    function venda(e, i) {
        if (qty === '' || qty < 0 || e.target.value < 1) {
            return setQty(0)
        }
        setQty(e.target.value)
    }

    // async function del(e) {
    //     e.preventDefault()
    //     let msgType = 'sucess'
    //     const data = await api.delete(`products/delete/${id}`)
    //         .then(response => {
    //             return response.data.message
    //         }).catch(error => {
    //             msgType = 'error'
    //             if (error.response.status === 500) {
    //                 return error.response.statusText
    //             } else {
    //                 return error.response.data.message
    //             }
    //         })
    //     setFlashMessage(data, msgType)
    //     if (msgType !== 'error') {
    //         navigate('/')
    //     }
    // }

    // async function returnEdit () 
    return (
        <section>
            {product && (<>
                <div className={styles.container_product}>
                    <Image src={`${process.env.REACT_APP_API}img/product/${productStorage.image}`} alt={productStorage.name} />
                    <h3>{productStorage.name}</h3>
                    <p><span>Ref: </span>{productStorage.ref}</p>
                    <p><span>Preço: </span>{productStorage.price}</p>
                </div>
                <div className={styles.container_form}>
                    {product.size && (
                        product.size.map((size, i) => (
                            <div key={size.id}>
                                <FormStock
                                    size={size}
                                    product={product}
                                    handleChange={(e) => handleChange(e, i)}
                                    isReadOnly={isReadOnly[i]}
                                    textLinkDefault='Editar estoque'
                                    textBtnSubmit='Cadastrar'
                                    submit={submit}
                                    isChecked={(e) => isChecked(e, i)}
                                    colorCheck={(e) => isChecked(e, i)}
                                    stockData={stockData[i]}
                                    venda={venda}
                                    textAtual={textAtual[i]}
                                />
                                <div className={styles.center}><span>Etoque: </span>{product.stocks[i]}</div>
                            </div>))
                    )}                </div>
            </>)}
            { <div>
                <Link to={`/products/edit-product/${id}`}>Editar</Link>
            </div> 
            /*
            <div className={styles.rigth}>
                <form onSubmit={del}>
                    <input type='submit' value='Deletar' />
                </form>
            </div> */}
        </section>
    )
}

export default AddColorStock