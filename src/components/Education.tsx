import { useState } from 'react'
import { useContent } from '../context/useContent'

export function Education() {
  const [showMoreCourses, setShowMoreCourses] = useState(true)
  const { degrees, certifications, moreCourses, uiEducation } = useContent()

  return (
    <section id="formacion" className="mx-auto max-w-[1200px] px-10 py-16">
      <div className="mb-9">
        <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
          {uiEducation.eyebrow}
        </div>
        <h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">{uiEducation.heading}</h2>
      </div>

      <div className="mb-11 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] border-t-2 border-b-2 border-divider">
        {degrees.map((degree, i) => (
          <div
            key={degree.title}
            className={`py-[26px] ${i < degrees.length - 1 ? 'border-r border-divider pr-[30px]' : ''} ${i > 0 ? 'pl-[30px]' : ''}`}
          >
            <div className="mb-[10px] font-heading text-[10px] font-extrabold tracking-[.08em] text-accent uppercase">
              {degree.category}
            </div>
            <h3 className="mb-[6px] text-[22px] tracking-[-0.015em]">{degree.title}</h3>
            <div className="mb-1 font-heading text-sm font-extrabold">{degree.institution}</div>
            <div className="text-[13px] text-mute-700">
              {degree.location} · {degree.dateRange}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-5">
        <div className="font-heading text-[11px] font-extrabold tracking-[.09em] uppercase">
          {uiEducation.coursesHeading}
        </div>
        <button
          type="button"
          onClick={() => setShowMoreCourses((v) => !v)}
          className="border-0 font-heading text-xs font-extrabold text-accent"
        >
          {showMoreCourses ? uiEducation.hideMoreCourses : uiEducation.showMoreCourses}
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-[2px] border-2 border-divider bg-divider">
        {certifications.map((cert) => (
          <div key={cert.title} className="flex flex-col gap-[10px] bg-bg px-[22px] py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-[34px] w-[34px] flex-none items-center justify-center border border-divider font-heading text-xs font-extrabold text-mute-700">
                {cert.issuerInitials}
              </div>
              {cert.featured && (
                <span className="bg-poster px-[6px] py-1 font-heading text-[9px] leading-none font-extrabold tracking-[.08em] text-white uppercase">
                  {uiEducation.certificationBadge}
                </span>
              )}
            </div>
            <div className="flex-1 font-heading text-[15px] leading-[1.25] font-extrabold">{cert.title}</div>
            <div className="text-xs text-mute-700">
              {cert.issuer} · {cert.date}
            </div>
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener" className="self-start border-0 font-heading text-xs font-extrabold">
                {uiEducation.viewCredential}
              </a>
            )}
          </div>
        ))}
      </div>

      {showMoreCourses && (
        <div className="mt-6 border border-divider px-[22px] py-5">
          <div className="mb-3 font-heading text-[11px] font-extrabold tracking-[.09em] text-mute-700 uppercase">
            {uiEducation.otherCoursesHeading}
          </div>
          <div className="flex flex-wrap gap-2">
            {moreCourses.map((course) => (
              <span
                key={course}
                className="border border-divider px-[9px] py-[7px] font-body text-xs leading-[1.4] font-semibold"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
