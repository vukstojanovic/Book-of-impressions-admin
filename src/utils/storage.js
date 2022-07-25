const storagePrefix = 'boi_site-'

const storage = {
  get: (key) => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}${key}`))
  },
  set: (key, value) => {
    window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value))
  },
  clear: (key) => {
    window.localStorage.removeItem(`${storagePrefix}${key}`)
  },
}

export default storage
