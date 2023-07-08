import express, { ErrorRequestHandler } from 'express'
import { MulterError } from 'multer'
import { uploadRoutes } from './routes/upload.routes'

const app = express()

app.use(express.json())

app.use('/upload', uploadRoutes)

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  res.status(400)

  if (err instanceof MulterError) {
    res.json({ error: err.code })
  }

  console.log(err)
  res.json({
    error: 'An internal error has occurred.',
  })
}

app.use(errorHandler)

app.listen(3333, () => console.log('Server is running!'))
