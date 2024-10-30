import { StrictMode } from 'react'  //строгий режим
import { createRoot } from 'react-dom/client'  //корневой узел  для рендеринга приложения
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
