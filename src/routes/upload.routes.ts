import { Router } from 'express'
import multer from 'multer'
import { unlink } from 'fs/promises'

import sharp from 'sharp'

export const uploadRoutes = Router()

const upload = multer({
  dest: './tmp',
  fileFilter: (req, file, cb) => {
    const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']

    cb(null, allowed.includes(file.mimetype))
  },
  limits: { fieldSize: 2000000 }, // 2 MB
})

uploadRoutes.post('/', upload.single('images'), async (req, res) => {
  const filename = `${req.file.filename}.jpg`

  if (!req.file) {
    return res.status(400).json({
      error: 'File not found',
    })
  }

  await sharp(req.file.path)
    .resize(1080, 1080)
    .toFormat('jpeg')
    .toFile(`./public/media/${filename}`)

  await unlink(req.file.path)

  return res.status(201).send()
})
