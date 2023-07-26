function RenderCor({isChecked, color, size }) {

    return (
        <div onChange={isChecked} key={color.id}>
            <label htmlFor={`${color.name}+${size.id}`}><span style={{
                display: 'block',
                height: 60 + 'px',
                width: 60 + 'px',
                backgroundColor: color.color
            }}></span>{color.name}</label>
            <input type="radio" data_size={size.id} name="color" id={`${color.name}+${size.id}`} value={color.id} required
            />
        </div>
    )
}

export default RenderCor