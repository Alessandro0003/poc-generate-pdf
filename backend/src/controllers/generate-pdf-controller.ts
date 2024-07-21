import { Request, Response } from 'express'
import { generateServicePDF } from '../services/generate-pdf.service'

export const generatePdfController = async (req: Request, res: Response) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).send('URL is required')
  }

  try {
    console.log(`Generating PDF for URL: ${url}`)
    const pdfBuffer = await generateServicePDF(url)
    res.setHeader('Content-Type', 'application/pdf')
    res.send(pdfBuffer)
  } catch (error) {
    console.error('Error generating PDF:', error.message)
    res.status(500).send('Failed to generate PDF')
  }
}
