import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import todoRouter from './routes/todo.route'

const PORT = process.env.PORT || 8080

const app = express()


app.listen(PORT, () => {
  console.log('Server has been started on ', PORT);
})

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Methods',
  )
  
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(todoRouter)