import { DataSource } from 'typeorm'
import { config } from 'dotenv'
config()

export const connectDB = async () => {
  const myDataSource = new DataSource({
    type: 'postgres',
    database: process.env.DATABASE_DB,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USER,
  })

  const connection = await myDataSource.initialize()
  console.log('connection with the database open')

  process.on('SIGINT', () => {
    connection.destroy().then(() => {
      console.log('connection with the database closed')
    })
  })
}
