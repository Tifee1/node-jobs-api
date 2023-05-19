import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { FormRow } from '../../components'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
    email: user?.email || '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    const { name, lastName, location, email } = values
    e.preventDefault()
    if (!name || !lastName || !location || !email) {
      toast.error('please fill out all values')
      return
    }
    dispatch(updateUser({ name, lastName, location, email }))
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className='form-center'>
          <FormRow
            type='name'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow
            type='name'
            name='lastName'
            labelText='last name'
            value={values.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type='location'
            name='location'
            value={values.location}
            handleChange={handleChange}
          />
          <button className='btn btn-block' disabled={isLoading} type='submit'>
            save changes
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default Profile
