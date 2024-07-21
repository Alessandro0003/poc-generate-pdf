import puppeteer from 'puppeteer'

export const generateServicePDF = async (
  url: string,
): Promise<{ pdf: Buffer; html: string }> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }) // Aumente o timeout para 60 segundos

  // Aguarde um tempo adicional usando waitForTimeout
  await page.setDefaultTimeout(60000)// 10 segundos

  // Obtenha o conteúdo HTML da página
  const html = await page.content()

  // Gere o PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
    },
  })

  await browser.close()
  return { pdf: pdfBuffer, html }
}
