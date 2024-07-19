"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3333;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/hello', (req, res) => {
    res.send('Olas');
});
app.post('/generate-pdf', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send('URL is required');
    }
    try {
        console.log(`Generating PDF for URL: ${url}`);
        const browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Failed to generate PDF');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
