import axios from 'axios'

export const instance = axios.create({
  // 1. add script: "start": "HTTPS=true react-scripts start" to package.json for using HTTPS protocol
  // 2. and need to uncomment some code on the server side (see mytasks-backend repo)
  // baseURL: 'https://localhost:3010',

  // local URL nodeJS server
  baseURL: 'http://localhost:3010',

  // Heroku URL nodeJS server
  // baseURL: 'https://fierce-falls-39397.herokuapp.com'
})
