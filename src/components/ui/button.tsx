import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const offsetMotion =
  'hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-bold uppercase tracking-wide',
    'transition-[transform,box-shadow,background-color,color] duration-200 disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-ink text-lime hover:bg-lime hover:text-ink',
        lime: 'bg-lime text-ink hover:bg-ink hover:text-lime',
        outline:
          'border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-lime',
        ghost: 'bg-transparent text-ink hover:bg-mute',
        paper: 'border-2 border-ink bg-paper text-ink hover:bg-lime',
      },
      size: {
        default: 'h-12 rounded-none px-7',
        sm: 'h-10 rounded-none px-5 text-xs',
        lg: 'h-14 rounded-none px-9 text-base',
        icon: 'size-11 shrink-0 rounded-none',
      },
      offset: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Black fill → lime pop (high contrast)
      {
        variant: 'default',
        offset: true,
        className: `offset-shadow-lime ${offsetMotion}`,
      },
      // Lime fill → black pop
      {
        variant: 'lime',
        offset: true,
        className: `offset-shadow-ink ${offsetMotion}`,
      },
      // Outline / paper → lime pop so it reads on white
      {
        variant: 'outline',
        offset: true,
        className: `offset-shadow-lime ${offsetMotion}`,
      },
      {
        variant: 'paper',
        offset: true,
        className: `offset-shadow-lime ${offsetMotion}`,
      },
      {
        variant: 'ghost',
        offset: true,
        className: `offset-shadow-lime ${offsetMotion}`,
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      offset: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, offset, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, offset, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
