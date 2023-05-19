import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { BarChart, AreaChart } from './'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { monthlyApplications } = useSelector((state) => state.allJobs)

  return (
    <Wrapper>
      <h4>monthly applications</h4>
      <button onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>

      {barChart ? (
        <BarChart data={monthlyApplications} />
      ) : (
        <AreaChart data={monthlyApplications} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`
export default ChartsContainer
