import axios from 'axios'

const inferBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL
  if (configuredUrl) {
    return configuredUrl
  }

  // When running in non-browser contexts (vite build, tests) just fall back to local dev API.
  if (typeof window === 'undefined') {
    return 'http://localhost:4000/api/v1'
  }

  const { hostname } = window.location

  // Local development (Vite dev server, Storybook, etc.)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:4000/api/v1'
  }

  // Production environments where the frontend is hosted on Vercel but API lives on Render.
  if (hostname.endsWith('vercel.app')) {
    return 'https://metralis-api.onrender.com/api/v1'
  }

  // Custom domains (e.g. app.metralis.com) route API traffic through api.metralis.com.
  if (hostname.endsWith('metralis.com')) {
    return 'https://api.metralis.com/api/v1'
  }

  // Fallback to same-origin relative API path so deployments with reverse proxies still work.
  const origin = window.location.origin
  return `${origin.replace(/\/$/, '')}/api/v1`
}

export const api = axios.create({
  baseURL: inferBaseUrl(),
})

export const setAuthToken = (token?: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}


