import { useEffect, useState } from 'react'
import { About } from './components/About'
import { AiWorkflow } from './components/AiWorkflow'
import { CommandPalette } from './components/CommandPalette'
import { DocumentMeta } from './components/DocumentMeta'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { ScrollProgressBar } from './components/ScrollProgressBar'
import { Skills } from './components/Skills'
import { TechNotes } from './components/TechNotes'
import { SkillsHighlightProvider } from './context/SkillsHighlightContext'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'

/** Vive dentro de los providers: la paleta ⌘K usa tema, idioma y contenido. */
function Shell() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <DocumentMeta />
      <ScrollProgressBar />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <Hero />

      <main>
        <About />
        <Skills />
        <Projects />
        <AiWorkflow />
        <Experience />
        <Education />
        <TechNotes />
      </main>

      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SkillsHighlightProvider>
          <Shell />
        </SkillsHighlightProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
