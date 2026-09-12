import { About } from './components/About'
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

// Separador entre secciones de nivel superior (no hay uno entre Skills y
// Projects — el prototipo tampoco lo tiene ahí, ver Portafolio JPMC.dc.html).
function SectionDivider() {
  return <hr className="mx-auto h-[2px] w-[calc(100%-80px)] max-w-[1200px] border-0 bg-divider" />
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SkillsHighlightProvider>
          <DocumentMeta />
          <ScrollProgressBar />
          <Navbar />

          <Hero />

          <main>
            <About />
            <SectionDivider />
            <Skills />
            <Projects />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Education />
            <SectionDivider />
            <TechNotes />
          </main>

          <Footer />
        </SkillsHighlightProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
