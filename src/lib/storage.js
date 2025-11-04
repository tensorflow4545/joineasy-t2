import { INITIAL_ASSIGNMENTS } from './mockData'

export const getAssignments = () => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('assignments')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) {
          localStorage.setItem('assignments', JSON.stringify(INITIAL_ASSIGNMENTS))
          return INITIAL_ASSIGNMENTS
        }
        // Ensure initial seed assignments exist (merge by unique id)
        const existingIds = new Set(parsed.map(a => a.id))
        const merged = parsed.concat(
          INITIAL_ASSIGNMENTS.filter(a => !existingIds.has(a.id))
        )
        if (merged.length !== parsed.length) {
          localStorage.setItem('assignments', JSON.stringify(merged))
        }
        return merged
      }
    } catch (e) {
      // fall through to reseed below
    }
  }
  localStorage.setItem('assignments', JSON.stringify(INITIAL_ASSIGNMENTS))
  return INITIAL_ASSIGNMENTS
}

export const saveAssignments = (assignments) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('assignments', JSON.stringify(assignments))
}

export const getSubmissions = () => {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem('submissions')
  return stored ? JSON.parse(stored) : {}
}

export const saveSubmissions = (submissions) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('submissions', JSON.stringify(submissions))
}

export const getStoredUser = () => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('currentUser')
  return stored ? JSON.parse(stored) : null
}

export const saveUser = (user) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export const saveToken = (token) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('authToken', token)
}

export const getToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

export const clearUser = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('currentUser')
  localStorage.removeItem('authToken')
}