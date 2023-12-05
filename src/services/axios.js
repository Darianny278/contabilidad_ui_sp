import axios from 'axios'

const fetchClient = () => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: 'https://contasys.azurewebsites.net/api',
  }

  // Create instance
  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use(function(config) {
    config.headers['x-api-key'] = 'fhhfjjppppf6666'
    return config
  }, function(error) {
    return Promise.reject(error)
  })

  return instance
}

const fetchExternalClient = () => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: 'https://neltonrg.pythonanywhere.com/api',
  }

  // Create instance
  return axios.create(defaultOptions)
}

export { fetchClient, fetchExternalClient }
