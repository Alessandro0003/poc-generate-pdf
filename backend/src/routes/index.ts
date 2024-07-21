import { Router } from 'express'
import { generatePdfController } from '../controllers/generate-pdf-controller'

const router = Router()

router.post('/generate-pdf', generatePdfController)

export default router
