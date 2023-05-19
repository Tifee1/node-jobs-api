import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from '../features/allJobs/allJobsSlice'
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'
import { StatItem } from './'

const StatsContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStats())
    // eslint-disable-next-line
  }, [])

  const { pending, interview, declined } = useSelector((state) => state.allJobs)
  const arr = [
    {
      label: 'pending applications',
      value: pending,
      icon: <FaSuitcaseRolling />,
      bcg: '#e9b949',
      color: '#fcefc7',
    },

    {
      label: 'interviews scheduled',
      value: interview,
      icon: <FaCalendarCheck />,
      bcg: '#647acb',
      color: '#e0e8f9',
    },
    {
      label: 'jobs declined',
      value: declined,
      icon: <FaBug />,
      bcg: '#d66969',
      color: '#ffeeee',
    },
  ]
  return (
    <Wrapper>
      {arr.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`
export default StatsContainer
