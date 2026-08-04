import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { AuthMenu } from '@/components/auth/AuthMenu'
import { SiteLink } from '@/components/shared/SiteLink'
import { useLandingVersion } from '@/lib/landingVersion'
import { primaryNav, siteMeta } from '@/lib/nav'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [version] = useLandingVersion()
  const editorial = version === 'v3'

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (editorial) {
    return (
      <header className="sticky top-0 z-50 border-b border-[var(--v3-ink,#1e1512)]/8 bg-[var(--v3-cream,#faf4f0)] text-[var(--v3-ink,#1e1512)]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-8 lg:px-10">
          <Link
            to="/"
            className="font-sans text-base font-bold tracking-tight sm:text-xl"
            onClick={() => setOpen(false)}
          >
            {siteMeta.name}
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <SiteLink
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-[13px] font-medium tracking-wide text-[var(--v3-ink,#1e1512)]/70 transition hover:text-[var(--v3-ink,#1e1512)]"
              >
                {item.label}
              </SiteLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <AuthMenu tone="light" variant="editorial" />
            <SiteLink
              to="/visit"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--v3-ink,#1e1512)] py-1.5 pr-1.5 pl-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-cream,#faf4f0)] transition hover:bg-[#140e0c]"
            >
              This Sunday
              <span className="flex size-7 items-center justify-center rounded-full bg-white text-[var(--v3-ink,#1e1512)]">
                <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
              </span>
            </SiteLink>
          </div>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-[var(--v3-ink,#1e1512)]/15 bg-white text-[var(--v3-ink,#1e1512)] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[var(--v3-ink,#1e1512)]/10 bg-[var(--v3-cream,#faf4f0)] lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-5 sm:px-5 sm:py-6">
                {primaryNav.map((item) => (
                  <SiteLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 font-sans text-lg font-bold tracking-tight text-[var(--v3-ink,#1e1512)] hover:bg-black/5"
                  >
                    {item.label}
                  </SiteLink>
                ))}
                <div className="mt-4 flex flex-col gap-3">
                  <AuthMenu tone="light" variant="editorial" />
                  <SiteLink
                    to="/visit"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-between gap-3 rounded-full bg-[var(--v3-ink,#1e1512)] py-2 pr-1.5 pl-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
                  >
                    <span>This Sunday · 10:30</span>
                    <span className="flex size-7 items-center justify-center rounded-full bg-white text-[var(--v3-ink,#1e1512)]">
                      <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                    </span>
                  </SiteLink>
                </div>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-lime text-lime-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8">
        <Link
          to="/"
          className="type-display text-[1.6875rem] leading-none tracking-tight text-lime-foreground sm:text-[1.875rem]"
          onClick={() => setOpen(false)}
        >
          {siteMeta.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <SiteLink
              key={item.href}
              to={item.href}
              className="px-3 py-2 font-mono text-xs font-medium uppercase tracking-wider text-lime-foreground transition hover:bg-ink/10"
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <AuthMenu tone="light" />
          <SiteLink
            to="/visit"
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-lime"
          >
            This Sunday
          </SiteLink>
        </div>

        <button
          type="button"
          className="flex size-11 items-center justify-center border-2 border-ink bg-paper text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 bg-ink lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-6">
              {primaryNav.map((item) => (
                <SiteLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 font-sans text-lg font-bold uppercase tracking-tight text-paper hover:bg-lime/20"
                >
                  {item.label}
                </SiteLink>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <AuthMenu tone="dark" />
                <SiteLink
                  to="/visit"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-lime px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-lime-foreground"
                >
                  This Sunday · 10:30
                </SiteLink>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
