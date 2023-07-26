import { useEffect, useState, useContext } from "react"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import useFlashMessage from "../../hooks/useFlashMessage"
import { Context } from "../../context/userContext"

import Image from "../layouts/Image"
import styles from "./Home.module.css"

function Home() {
    const [products, setProducts] = useState([])
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    const [msg, setMsg] = useState(undefined)
    const { authenticated } = useContext(Context)

    useEffect(() => {
        api.get('products').then(response => {
            setProducts(response.data.products)
        }).catch(error => {
            if(!error.response) {
                setMsg('Erro de rede')
            } else if (error.response.status === 500) {
              return  error.response.statusText
            } else {
              return  error.response.data.message
            }
        })
    }, [msg])
    if(msg) {
        setFlashMessage(msg, 'error')
    }
    function productId (e, i) {
        localStorage.setItem('product', JSON.stringify(products[i]))
        navigate(`products/${products[i].id}`) 
    }
    return (
        <section>
            <div>Esse projeto á apenas uma demonstração, em um projeto real talvez precise de mais regras para o acesso, tipo quem é o adimnistrador, quem pode editar ou só vizualizar</div>
            <div>
                <h1>Produtos</h1>
            </div>
            <div className={styles.home_container}>
            {products.length > 0 &&
                products.map((product, i) => (
                    <div className="card" key={product.id}>
                        <div>
                            <Image
                                src={`${process.env.REACT_APP_API}img/product/${product.image}`}
                                alt={product.name} />
                        </div>
                        <h3>{product.name}</h3>
                        {authenticated ? (
                         <div className="btn" onClick= { (e) => productId(e, i)} >Detalhes</div>   
                        ) : (
                            <Link to='/login'>faça login</Link>
                        )}   
                    </div>
                ))
            }
            </div>
        </section>
    )
}

export default Home