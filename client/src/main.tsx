import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/components/context/ThemeProvider.tsx"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="college-ui-theme">
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
