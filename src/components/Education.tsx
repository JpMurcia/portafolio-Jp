import { useState } from 'react'
import { useContent } from '../context/useContent'
import { Eyebrow, SectionHeader } from './ui/SectionHeader'

export function Education() {
  const [showMoreCourses, setShowMoreCourses] = useState(true)
  const { degrees, certifications, moreCourses, uiEducation } = useContent()

  return (
    <section id="formacion" className="mx-auto max-w-[1200px] px-5 py-12 sm:px-10 sm:py-16">
      <SectionHeader eyebrow={uiEducation.eyebrow} heading={uiEducation.heading} />

      <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {degrees.map((degree) => (
          <div key={degree.title} className="card p-6">
            <Eyebrow className="mb-3 text-[10px]">{degree.category}</Eyebrow>
            <h3 className="mb-2 text-[22px] leading-[1.2] tracking-[-0.02em]">{degree.title}</h3>
            <div className="mb-1 text-sm font-semibold">{degree.institution}</div>
            <div className="text-[13px] text-mute-700">
              {degree.location} · {degree.dateRange}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-5">
        <div className="font-mono text-[11px] tracking-[.08em] text-mute-700 uppercase">
          {uiEducation.coursesHeading}
        </div>
        <button
          type="button"
          onClick={() => setShowMoreCourses((v) => !v)}
          aria-expanded={showMoreCourses}
          className="rounded-md border-0 px-2 py-1 text-xs font-semibold text-accent hover:bg-accent/10"
        >
          {showMoreCourses ? uiEducation.hideMoreCourses : uiEducation.showMoreCourses}
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-4">
        {certifications.map((cert) => (
          <div key={cert.title} className="card flex flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="tile flex h-9 w-9 flex-none items-center justify-center font-mono text-xs font-medium text-mute-700">
                {cert.issuerInitials}
              </div>
              {cert.featured && (
                <span className="rounded-md bg-poster px-2 py-1 font-mono text-[10px] leading-none font-medium tracking-[.08em] text-white uppercase">
                  {uiEducation.certificationBadge}
                </span>
              )}
            </div>
            <div className="flex-1 text-[15px] leading-[1.3] font-semibold">{cert.title}</div>
            <div className="text-xs text-mute-700">
              {cert.issuer} · {cert.date}
            </div>
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener" className="self-start border-0 text-xs font-semibold">
                {uiEducation.viewCredential}
              </a>
            )}
          </div>
        ))}
      </div>

      {showMoreCourses && (
        <div className="card mt-6 p-5 sm:p-6">
          <div className="mb-4 font-mono text-[11px] tracking-[.08em] text-mute-700 uppercase">
            {uiEducation.otherCoursesHeading}
          </div>
          <div className="flex flex-wrap gap-2">
            {moreCourses.map((course) => (
              <span key={course} className="chip leading-[1.4]">
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
