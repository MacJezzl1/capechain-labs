import Link from 'next/link'

/**
 * Custom not-found page for the frontend.
 * This renders when `notFound()` is called from any page in the (frontend) route group.
 *
 * Customize this component to match your app's design and provide helpful navigation.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-8 py-16 text-center">
      <p className="text-xs uppercase tracking-[.24em] text-cyan-300">404 / Signal lost</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight">Page not found.</h1>
      <p className="mt-4 text-zinc-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
        href="/"
      >
        &larr; Back to Home
      </Link>
    </main>
  )
}
