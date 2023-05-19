const FormRow = ({ name, type, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={name}
        className='form-input'
        onChange={handleChange}
      />
    </div>
  )
}
export default FormRow
