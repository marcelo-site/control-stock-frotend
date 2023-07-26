function Input ({type, name, text, value, handleOnChange, placeholder, multiple}) {
    return (
        <div>
            <label htmlFor={name}>{text}</label>
            <input 
            type={type} 
            name={name} 
            placeholder={placeholder}
            value={value}
            id={name}
            onChange={handleOnChange}
            {...(multiple ? {multiple} : '')}
            />
        </div>
    )
}

export default Input