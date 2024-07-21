import express from 'express'
import cors from 'cors'
import routes from './routes/index'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/app', routes)

export default app
