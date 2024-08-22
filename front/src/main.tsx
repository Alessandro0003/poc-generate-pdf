import React from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster } from 'sonner'
import { App } from './pages'
import { ThemeProvider } from './components/theme/theme-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
    <Toaster richColors /> 
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)
