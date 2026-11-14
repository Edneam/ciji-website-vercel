import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// `npm run build` prerenders every route into static HTML. Hydrate that
// markup instead of throwing it away with createRoot: crawlers and no-JS
// visitors already have the full page, and hydration keeps it on screen
// instead of flashing an empty root while React rebuilds it.
//
// The one exception is a filtered projects view. Its static HTML is the
// unfiltered catalogue on purpose (the query variants canonicalise to
// /projects), so the client's first render would not match it. Rendering
// from scratch there is both correct and quiet.
const params = new URLSearchParams(window.location.search)
const isFilteredProjects =
  window.location.pathname === '/projects' && (params.has('type') || params.has('photo'))

if (container.hasChildNodes() && !isFilteredProjects) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
