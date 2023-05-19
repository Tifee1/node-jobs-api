import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { FormRow, FormSelect } from '../../components'
import {
  clearValues,
  createJob,
  editJob,
  handleInput,
} from '../../features/jobs/jobsSlice'
import { jobOptions, statusOptions } from '../../utils/constants'

const AddJob = () => {
  const {
    position,
    company,
    jobLocation,
    status,
    jobType,
    isLoading,
    isEditing,
    editId,
  } = useSelector((state) => state.jobs)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleInput({ name, value }))
  }

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleInput({ name: 'jobLocation', value: user.location }))
    }
    // eslint-disable-next-line
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      toast.error('please fill all fields')
      return
    }
    if (isEditing) {
      dispatch(
        editJob({ id: editId, position, company, jobLocation, status, jobType })
      )

      return
    }
    dispatch(createJob({ position, company, jobLocation, status, jobType }))
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleChange}
          />
          <FormSelect
            name='status'
            value={status}
            labelText='Status'
            list={statusOptions}
            handleChange={handleChange}
          />
          <FormSelect
            name='jobType'
            value={jobType}
            list={jobOptions}
            labelText='Job Type'
            handleChange={handleChange}
          />
          <div className='btn-container'>
            <button
              className='btn btn-block clear-btn'
              type='button'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              disabled={isLoading}
            >
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
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

export default AddJob
