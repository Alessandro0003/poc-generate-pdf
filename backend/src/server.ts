import express, { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import cors from 'cors'

const app = express()
const port = 3333

app.use(express.json())
app.use(cors())

app.post('/generate-pdf', async (req: Request, res: Response) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).send('URL is required')
  }

  try {
    console.log(`Generating PDF for URL: ${url}`)

    // Lançar o navegador
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })

    // Gerar o PDF
    const pdfBuffer = await page.pdf({ format: 'A4' })

    await browser.close()

    res.setHeader('Content-Type', 'application/pdf')
    res.send(pdfBuffer)
  } catch (error) {
    console.error('Error generating PDF:', 'error.message')
    res.status(500).send('Failed to generate PDF')
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
