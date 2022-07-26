const storagePrefix = 'boi_site-'

const storage = {
  get: (key) => {
    return JSON.parse(localStorage.getItem(`${storagePrefix}${key}`))
  },
  set: (key, value) => {
    localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value))
  },
  clear: (key) => {
    localStorage.removeItem(`${storagePrefix}${key}`)
  },
}

export default storage
