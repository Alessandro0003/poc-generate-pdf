import './global.css'
import { useState } from 'react'
import { Form } from './components/Form'

export function App() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFormSubmit = async (values: { name: string; date: string; url: string }) => {
    try {
      const response = await fetch('http://localhost:3333/app/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF. Please check the URL and try again.');
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-muted">
      <Form onSubmit={handleFormSubmit} />
      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}
      {pdfUrl && (
        <a
          href={pdfUrl}
          download="download.pdf"
          className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
        >
          Download PDF
        </a>
      )}
    </div>
  );
}
