import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as logger from 'morgan'

// import { connectDB } from './config/db'
import { routers } from './routers/routers'

// create the app
export const app = express()
app.use(cors())
app.use(bodyParser.json())

// config log
app.use(logger('dev'))

// connect to database
// connectDB()


app.use(routers)