import { useState } from 'react'
import styled from 'styled-components'
import { FormRow, Logo } from '../components'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const initialUser = { name: '', email: '', password: '', isRegistered: true }
  const [value, setValue] = useState(initialUser)

  const { isLoading, logged } = useSelector((store) => store.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const values = e.target.value

    setValue({ ...value, [name]: values })
  }
  const handleSubmit = (e) => {
    const { name, email, password, isRegistered } = value
    e.preventDefault()
    if (!email || !password || (!isRegistered && !name)) {
      toast.error('Please fill out all fields')
      return
    }
    if (!isRegistered) {
      dispatch(registerUser({ name, email, password }))
      return
    }
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (logged) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
    // eslint-disable-next-line
  }, [logged])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{value.isRegistered ? 'login' : 'register'}</h3>
        {!value.isRegistered && (
          <FormRow
            type='text'
            name='name'
            value={value.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          name='email'
          value={value.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={value.password}
          handleChange={handleChange}
        />
        <button className='btn btn-block' disabled={isLoading} type='submit'>
          {isLoading ? 'Loading...' : value.isRegistered ? 'login' : 'register'}
        </button>{' '}
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            )
          }
        >
          {isLoading ? 'loading...' : 'demo app'}
        </button>
        <p>
          {value.isRegistered ? 'Not a member yet?' : 'Already a member?'}
          <button
            className='member-btn'
            type='button'
            onClick={() =>
              setValue({ ...value, isRegistered: !value.isRegistered })
            }
          >
            {value.isRegistered ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`
export default Login
