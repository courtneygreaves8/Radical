import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const offsetMotion =
  'hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-1.5 active:translate-y-1.5'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-bold uppercase tracking-wide',
    'isolate transition-[box-shadow,background-color,color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-current',
  ].join(' '),
  {
    variants: {
      variant: {
        // Black face / lime type → white + black stroke on hover; paper offset slab
        default:
          'border-2 border-ink bg-ink text-lime hover:bg-paper hover:text-ink',
        lime: 'border-2 border-ink bg-lime text-ink hover:bg-paper hover:text-ink',
        outline: [
          'border-2 border-ink bg-transparent text-ink hover:bg-paper hover:text-ink',
          'offset-shadow-paper',
          offsetMotion,
        ].join(' '),
        ghost: 'bg-transparent text-ink hover:bg-mute hover:text-ink',
        paper:
          'border-2 border-ink bg-paper text-ink hover:bg-ink hover:text-lime',
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
      {
        variant: 'default',
        offset: true,
        className: `offset-shadow-paper ${offsetMotion}`,
      },
      {
        variant: 'lime',
        offset: true,
        className: `offset-shadow-paper ${offsetMotion}`,
      },
      {
        variant: 'paper',
        offset: true,
        className: `offset-shadow-paper ${offsetMotion}`,
      },
      {
        variant: 'ghost',
        offset: true,
        className: `offset-shadow-paper ${offsetMotion}`,
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
        className={cn(buttonVariants({ variant, size, offset }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
