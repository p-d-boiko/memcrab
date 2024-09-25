import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from 'root:app'
import { MatrixContextProvider } from 'root:matrix'
import 'root:styles/index.css'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <MatrixContextProvider>
      <App />
    </MatrixContextProvider>
  </StrictMode>,
)
