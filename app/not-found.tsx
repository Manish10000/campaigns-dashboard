import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-[#040507] text-red-500">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-600/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,11,11,0.16)_0%,rgba(4,5,7,0)_55%)] dark:block hidden" />

      <section className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 rounded-full border border-red-500/30 animate-spin [animation-duration:10s]" />
          <div className="absolute inset-3 rounded-full border border-red-400/40 animate-spin [animation-duration:6s] [animation-direction:reverse]" />
          <div className="relative h-36 w-36 rounded-full border border-red-500/50 bg-white/60 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <span className="text-5xl font-black tracking-tight text-red-500">404</span>
          </div>
        </div>

        <h1 className="mb-3 text-3xl sm:text-5xl font-bold tracking-tight">This page could not be found.</h1>
        <p className="mb-10 max-w-xl text-sm sm:text-base text-red-400">
          Looks like this route drifted into the void. Let&apos;s get you back to something useful.
        </p>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button className="bg-[linear-gradient(180deg,#ba0b0b_0%,#8f0707_100%)] text-white border border-red-600 hover:opacity-95">
              Go To Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="border-red-500/60 text-red-200 hover:bg-red-950/40 hover:text-white"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
