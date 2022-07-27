const storagePrefix = 'boi_site-'

const storage = {
  get: (key) => {
    return localStorage.getItem(`${storagePrefix}${key}`)
  },
  set: (key, value) => {
    console.log(value)
    localStorage.setItem(`${storagePrefix}${key}`, value)
  },
  clear: (key) => {
    localStorage.removeItem(`${storagePrefix}${key}`)
  },
}

export default storage
