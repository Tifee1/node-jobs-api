import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice'
import { jobOptions, sortOptions, statusOptions } from '../utils/constants'
import FormRow from './FormRow'
import FormSelect from './FormSelect'

const SearchContainer = () => {
  const { search, status, jobType, sort, isLoading } = useSelector(
    (state) => state.allJobs
  )
  const dispatch = useDispatch()

  const handleInput = (e) => {
    if (isLoading) return
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChange({ name, value }))
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleInput}
          />
          <FormSelect
            name='status'
            value={status}
            labelText='Job Status'
            handleChange={handleInput}
            list={['all', ...statusOptions]}
          />
          <FormSelect
            name='jobType'
            value={jobType}
            labelText='Job Type'
            handleChange={handleInput}
            list={['all', ...jobOptions]}
          />
          <FormSelect
            name='sort'
            value={sort}
            labelText='Sort'
            handleChange={handleInput}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            type='button'
            onClick={() => dispatch(clearFilters())}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`

export default SearchContainer
