const FormSelect = ({ name, labelText, value, list, handleChange }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name}>{labelText || name}</label>
      <select
        name={name}
        id={name}
        className='form-select'
        value={value}
        onChange={handleChange}
      >
        {list.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default FormSelect
