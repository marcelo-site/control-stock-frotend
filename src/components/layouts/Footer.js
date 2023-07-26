import { Link } from "react-router-dom"
import styles from "./Footer.module.css"

function Footer (){
    return (
        <footer className={styles.footer}>
          <span>&copy;</span>  2023 | Feito por <Link to="https://www.facebook.com/profile.php?id=100015225941991" target="_blank" > Marcelo</Link> 
        </footer>
    )
}

export default Footer