'use client'

const TOKEN_KEY = 't'

const storageService = {
  getToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token) {
    if (typeof window === 'undefined') return null
    localStorage.setItem(TOKEN_KEY, token)
  },
  clear() {
    if (typeof window === 'undefined') return null
    localStorage.removeItem(TOKEN_KEY)
  },
}

export { storageService }
