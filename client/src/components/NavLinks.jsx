import { NavLink } from 'react-router-dom'
import { links } from '../utils/constants'

const NavLinks = ({ handleChange }) => {
  return (
    <>
      {links.map((item) => {
        const { id, label, url, icon } = item
        return (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            onClick={handleChange}
            to={url}
            key={id}
          >
            <span className='icon'>{icon}</span>
            <span className='text'>{label}</span>
          </NavLink>
        )
      })}
    </>
  )
}
export default NavLinks
