import puppeteer from 'puppeteer';

export const generateServicePDF = async (url: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    // Aumente o tempo de espera para garantir que todos os recursos sejam carregados
    await page.setDefaultNavigationTimeout(60000);

    // Capture o conteúdo completo da página, incluindo imagens, vídeos e scripts
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
};