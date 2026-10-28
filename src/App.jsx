import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Cookies from './pages/Cookies.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

export default function App() {
  const { pathname } = useLocation()

  return (
    <div id="top" className="flex min-h-screen flex-col">
      {/* Keyboard users can jump the nav. Was missing entirely. */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        {/* Both elements are keyed on the pathname, so React remounts them on
            every route change and their CSS animations replay. Without the key
            they would only ever run once, on first load.

            The sweep is a SIBLING of the animated wrapper, not a child or a
            pseudo-element of it. `.page-in` animates a scale, and a scaled
            element becomes the containing block for `position: fixed`
            descendants, so a sweep inside it would not resolve against the
            viewport and would be drawn off-screen once the page is scrolled. */}
        <div key={`sweep-${pathname}`} className="route-sweep" aria-hidden="true" />
        <div key={pathname} className="page-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}
