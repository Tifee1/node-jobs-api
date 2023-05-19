export const addToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeFromLocalStorage = () => {
  localStorage.removeItem('user')
}

export const getLocalStorage = () => {
  let storage = localStorage.getItem('user')
  if (storage) {
    storage = JSON.parse(localStorage.getItem('user'))
  } else {
    storage = null
  }
  return storage
}
