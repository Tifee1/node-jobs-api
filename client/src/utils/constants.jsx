import { FaWpforms } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'
import { MdQueryStats } from 'react-icons/md'
import { ImProfile } from 'react-icons/im'

export const links = [
  { id: 1, url: '/stats', label: 'Stats', icon: <BsFillBarChartFill /> },
  { id: 2, url: '/all-jobs', label: 'All jobs', icon: <MdQueryStats /> },
  { id: 3, url: '/add-job', label: 'add job', icon: <FaWpforms /> },
  { id: 4, url: '/profile', label: 'profile', icon: <ImProfile /> },
]

export const jobOptions = ['full-time', 'part-time', 'internship', 'remote']
export const statusOptions = ['pending', 'interview', 'declined']
export const sortOptions = ['latest', 'oldest', 'a-z', 'z-a']
