import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { AuthMenu } from '@/components/auth/AuthMenu'
import { primaryNav, siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-lime">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8">
        <Link
          to="/"
          className="type-display text-[1.6875rem] leading-none tracking-tight text-ink sm:text-[1.875rem]"
          onClick={() => setOpen(false)}
        >
          {siteMeta.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 font-mono text-xs font-medium uppercase tracking-wider transition',
                  isActive ? 'bg-ink text-lime' : 'text-ink hover:bg-ink/10'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <AuthMenu tone="light" />
          <Button
            variant="default"
            size="sm"
            offset
            asChild
          >
            <Link to="/visit">This Sunday</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex size-11 items-center justify-center border-2 border-ink bg-paper lg:hidden"
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
            className="overflow-hidden border-t-2 border-ink bg-ink lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-6">
              {primaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-3 font-sans text-lg font-bold uppercase tracking-tight',
                      isActive ? 'bg-lime text-ink' : 'text-paper hover:bg-lime/20'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <AuthMenu tone="dark" />
                <Button variant="lime" offset asChild>
                  <Link to="/visit" onClick={() => setOpen(false)}>
                    This Sunday · 10:30
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
