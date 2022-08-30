import { app } from './app'
import { config } from 'dotenv'
config()

const server = app.listen(process.env.APPLICATION_PORT, () => {
  console.log(`server running on port  ${process.env.APPLICATION_PORT}`)
})

process.on('SIGINT', () => {
  server.close()
  console.log(`server closed`)
})
