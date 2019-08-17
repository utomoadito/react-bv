const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./src/api/db.json')
const userdb = JSON.parse(fs.readFileSync('./src/api/db_user.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  )
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(user => user.email === email && user.password === password) !==
    -1
  )
}

// Check if Authorize in header is right format and valid
function checkAuthorize(req, res, next) {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1])

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    if (next) {
      const status = 401
      const message = 'Error access_token is revoked'
      res.status(status).json({ status, message })
    }
  }
}

// Register New User
server.post('/auth/register', (req, res) => {
  console.log('register endpoint called; request body:')
  console.log(req.body)
  const { email, password } = req.body

  if (isAuthenticated({ email, password }) === true) {
    const status = 401
    const message = 'Email and Password already exist'
    res.status(status).json({ status, message })
    return
  }

  fs.readFile('./src/api/db_user.json', (err, datas) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    }

    // Get current users data
    var data = JSON.parse(datas.toString())

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id

    //Add new user
    data.users.push({ id: last_item_id + 1, email: email, password: password }) //add some data
    fs.writeFile('./src/api/db_user.json', JSON.stringify(data), (err, result) => {
      // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({ status, message })
        return
      }
    })
  })

  // Create token for new user
  const access_token = createToken({ email, password })
  console.log('Access Token:' + access_token)
  res.status(200).json({ access_token })
})

// Login to one of the users from ./src/api/db_user.json
server.post('/auth/login', (req, res) => {
  console.log('login endpoint called; request body:')
  console.log(req.body)
  const { email, password } = req.body
  if (isAuthenticated({ email, password }) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({ status, message })
    return
  }
  const access_token = createToken({ email, password })
  const userIndex = userdb.users.findIndex(
    user => user.email === email && user.password === password
  )
  const data_user = userdb.users[userIndex]
  console.log('Access Token:' + access_token)
  res.status(200).json({
    access_token,
    data_user
  })
})

// Update user from ./src/api/db_user.json after login
server.post('/user/:id', (req, res) => {
  checkAuthorize(req, res)

  const userIndex = userdb.users.findIndex(user => user.id === parseInt(req.params.id))
  const { email, password } = req.body

  fs.readFile('./src/api/db_user.json', (err, datas) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    }

    // Get current users data
    var data = JSON.parse(datas.toString())

    //Edit user
    Object.assign(data.users[userIndex], { email: email, password: password })
    fs.writeFile('./src/api/db_user.json', JSON.stringify(data), (err, result) => {
      // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({ status, message })
        return
      }
    })
  })
  res.status(200).json({
    id: req.params.id,
    index: userIndex,
    status: 'Success'
  })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => checkAuthorize(req, res, next))

server.use(router)

server.listen(4000, () => {
  console.log('Run Auth API Server')
})
