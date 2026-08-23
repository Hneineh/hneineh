import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'
import { hideAppPreloader } from './lib/preloader.ts'
import GalleryPage from './pages/GalleryPage.tsx'
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/gallery/carpentry', element: <GalleryPage galleryId="carpentry" /> },
      { path: '/gallery/design', element: <GalleryPage galleryId="design" /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StrictMode>,
)

requestAnimationFrame(() => requestAnimationFrame(hideAppPreloader))
