import RenderCor from "../layouts/RenderCor"
import stylesCor from "../layouts/RenderCor.module.css"
import styles from "./FormStock.module.css"

function FormStock({ size, product, handleChange,
    isReadOnly, textBtnSubmit,
    submit, isChecked, stockData, venda, qty, textAtual }) {

    return (
        <form className={styles.form} onSubmit={submit}>
            <input type="hidden" value={size.id} name="size" />
            <input type="hidden" value={product.lojas.id} name="loja" />
            <h3>Tamanho: {size.name}</h3>
            <div className={stylesCor.render_cor}>
                {product.color.map((color, i) => (
                    <RenderCor
                        key={i}
                        isChecked={isChecked}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <div>
                <div key={product.lojas.id}>
                    <h3>{product.lojas.name}</h3>
                    <p>estoque da cor selecionada:</p>
                    <div className="inputs-qty">
                        <div>
                            <label htmlFor={`stock+${size.id}`}>{textAtual !== undefined ?textAtual : 'Estoque:'}</label>
                            <input
                                type="number"
                                name="stock"
                                placeholder="Insira o estoque"
                                id={`stock+${size.id}`}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                                value={stockData} />
                        </div>
                        <div>
                            {isReadOnly && (
                                <>
                                    <label>Novo estoque:</label>
                                    <input type="number"
                                        name="vendas"
                                        placeholder="Insira o estoque"
                                        onChange={venda}
                                        value={qty}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <input type="submit" value={textBtnSubmit} />
        </form>
    )
}

export default FormStock