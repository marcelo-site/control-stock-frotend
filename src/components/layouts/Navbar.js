import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { BsList } from "react-icons/bs";

import styles from "./Navbar.module.css"

import { Context } from "../../context/userContext"

function Navbar() {
    const deviceSmall = window.innerWidth < 720 ? true : false
    const [mobile, setMobile] = useState(deviceSmall)
    const { authenticated, logout } = useContext(Context)
    const [btnMenu] = useState(deviceSmall)
    const [back, setBack] = useState(deviceSmall)

    function toggle () {
        if (deviceSmall) {
            setBack(!back)
            setMobile(!mobile)
            document.querySelector('body').classList.toggle('over-hidden')
        }
    }
    return (
        <nav className={styles.nav_bar}>
            {!back && <div onClick={toggle} className="back"></div>}
            <div>Logo</div>
            <ul>
                <li><Link to='/'>Home</Link></li>
              {!mobile && <div onClick={toggle} id="menu-toglle">
                {authenticated ? (<>
                    <li><Link to='/products/register'>Criar produto</Link></li>
                    <li><Link to='/products/create-color'>Criar cor</Link></li>
                    <li><p onClick={logout}>Sair</p></li>
                </>) : (
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Registrar</Link></li>
                    </>
                )}
                </div>}
                {btnMenu && (<div className='btn_menu' onClick={toggle}>Menu <span>{mobile ? (<BsList />) : (<span className="exit">x</span>)}</span></div>)}
            </ul>
        </nav>
    )
}

export default Navbar