import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getJobs } from '../features/allJobs/allJobsSlice'
import { Jobs, PageBtn, Loading } from './'

const JobContainer = () => {
  const {
    jobs,
    totalJobs,
    numOfPages,
    isLoading,
    search,
    sort,
    jobType,
    status,
    page,
  } = useSelector((state) => state.allJobs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getJobs())
    // eslint-disable-next-line
  }, [search, sort, jobType, status, page])

  if (isLoading) {
    return <Loading />
  }

  if (jobs.length < 1) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs === 1 ? '' : 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Jobs key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtn numOfPages={numOfPages} page={page} />}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`
export default JobContainer
