import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

const api = {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null           // app will consider user as logged in, when User exists in local Storage
  },

  isAdmin() {
    const user = localStorage.getItem('user');
    return (user !== null && user !== "null" ) 
      ? JSON.parse(user).isAdmin  // if yes, check if admin
      : false                     // if not, return false
  },

  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  googleLogin(googleId, username, profilePic) {
    return service
      .post('/googlelogin', { googleId, username, profilePic })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  getUserSettings(userId) {
    return service
      .get('/user/' + userId + '/settings')
      .then(res => res.data)
      .catch(errHandler)
  },

  saveUserSettings(userId, settings, settingType) {
    return service
      .post('/user/' + userId + '/settings', settings)
      .then(res => res.data)
      .catch(errHandler)
  },

  hasLiked(target) {
    return service
      .post('/checkheart', target)
      .then(res => res.data)
      .catch(errHandler)
  },

  addHeart(target) {
    // target['userId'] = JSON.parse(localStorage.getItem('user'))._id
    return service
      .post('/heart', target)
      .then(res => res.data)
      .catch(errHandler)
  },

  // ==========
  // News
  // ==========

  getNews() {
    return service
      .get('/news')
      .then(res => res.data)
      .catch(errHandler)
  },

  getOneNews(id) {
    return service
      .get('/news/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },

  addNews(body) {
    return service
      .post('/news', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  updateNews(id, body) {
    return service
      .post('/news/'+id, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteNews(id) {
    return service
      .post('/news/'+id+'/delete')
      .then(res => res.data)
      .catch(errHandler)
  },

  // ==========
  // Collections
  // ==========

  getCollections() {
    return service
      .get('/collection')
      .then(res => res.data)
      .catch(errHandler)
  },

  getOneCollection(id) {
    return service
      .get('/collection/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },

  addCollection(body) {
    return service
      .post('/collection', body)
      .then(res => res.data)
      .catch(errHandler)
  },
  
  updateCollection(id, body) {
    return service
      .post('/collection/'+id, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteCollection(id) {
    return service
      .post('/collection/'+id+'/delete')
      .then(res => res.data)
      .catch(errHandler)
  }
}

export default api; 