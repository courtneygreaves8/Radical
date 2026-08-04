import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const offsetMotion =
  'hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-1 active:translate-y-1'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-[0.14em]',
    'isolate rounded-full transition-[box-shadow,background-color,color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-current',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'border border-ink bg-ink text-paper hover:bg-[#140e0c]',
        lime: 'border border-lime bg-lime text-lime-foreground hover:bg-[#c4572c]',
        outline:
          'border border-ink/20 bg-transparent text-ink hover:border-ink/40 hover:bg-paper',
        ghost: 'bg-transparent text-ink hover:bg-mute hover:text-ink',
        paper:
          'border border-paper/20 bg-paper text-ink hover:bg-white',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-[10px]',
        lg: 'h-12 px-8 text-xs',
        icon: 'size-11 shrink-0',
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
        className: `offset-shadow-ink ${offsetMotion}`,
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
