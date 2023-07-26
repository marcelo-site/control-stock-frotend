import styles from '../form/Form.module.css'
import { useState, useEffect } from 'react'

import Input from './Input'
import Image from '../layouts/Image'

function ProductForm({ handleSubmit, productData, btnText }) {
    const [preview, setPreview] = useState('')
    const [product, setProduct] = useState(productData || undefined)

    useEffect(() => {
        setProduct(productData)
    }, [productData])
    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    function onFile(e) {
        setPreview(e.target.files[0])
        setProduct({ ...product, image: e.target.files[0] })
    }
    function submit(e) {
        e.preventDefault()
        handleSubmit(product)
    }

    return (
        <section className={styles.form_container}>
            <h2>Cadastrar Produto</h2>
            <form onSubmit={submit}>
                <div>
                    {preview !== '' ? (
                        <Image src={URL.createObjectURL(preview)} alt='foto' />
                    ) : (
                        <Image src={product !== undefined ?
                             `${process.env.REACT_APP_API}img/product/${product.image}` : ''
                            } alt='foto' />
                    )}
                </div>
                <Input
                    text='Imagem do produto:'
                    name='image'
                    type='file'
                    handleOnChange={onFile}
                />
                <Input
                    text='Nome do produto:'
                    name='name'
                    type='text'
                    placeholder='Insira o nome do peroduto'
                    handleOnChange={handleChange}
                    value={product !== undefined ? product.name : ''}
                />
                <Input
                    text='Referencia do produto:'
                    name='ref'
                    type='number'
                    placeholder='Insira a refencia do produto'
                    handleOnChange={handleChange}
                    value={product !== undefined ? product.ref : ''}
                />
                <Input
                    text='Preço:'
                    name='price'
                    type='text'
                    placeholder='Insira a referência do produto'
                    handleOnChange={handleChange}
                    value={product !== undefined ? product.price : ''}
                />
                <input type='submit' value={btnText} />
            </form>
        </section>
    )
}

export default ProductForm