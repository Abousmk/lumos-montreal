import { lazy, Suspense } from 'react'

const Interviews = lazy(() => import('../components/Interviews'))
const Blog = lazy(() => import('../components/Blog'))
const Collaborations = lazy(() => import('../components/Collaborations'))

export default function Media() {
  return (
    <main className="media night-sky">
      <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
        <Interviews />
      </Suspense>
      <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
        <Blog />
      </Suspense>
      <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
        <Collaborations />
      </Suspense>
    </main>
  )
}

