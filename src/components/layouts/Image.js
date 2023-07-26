import styles from "./Image.module.css"

function Image ({src, alt }) {
    return (
       <div>
         <img src={src} className={styles.img} alt={alt} />
       </div>
    )
}

export default Image