import styled from 'styled-components'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { changePage } from '../features/allJobs/allJobsSlice'
import { useDispatch } from 'react-redux'

const PageBtn = ({ numOfPages, page }) => {
  const arr = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })
  const dispatch = useDispatch()

  const nextPage = () => {
    let num = page + 1
    if (num > numOfPages) {
      num = numOfPages
    }
    dispatch(changePage(num))
  }
  const prevPage = () => {
    let num = page - 1
    if (num < 1) {
      num = 1
    }
    dispatch(changePage(num))
  }

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft /> prev
      </button>
      <div className='btn-container'>
        {arr.map((item, index) => {
          return (
            <button
              className={item === page ? 'pageBtn active' : 'pageBtn'}
              key={index}
              onClick={() => dispatch(changePage(item))}
            >
              {item}
            </button>
          )
        })}
      </div>

      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--primary-100);
    border-radius: var(--borderRadius);
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .active {
    background: var(--primary-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`
export default PageBtn
