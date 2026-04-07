import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none disabled:active:scale-100 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/25 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary/15 shadow-sm hover:bg-primary/92 hover:shadow-md",
        destructive:
          "bg-destructive text-white border border-destructive/20 shadow-sm hover:bg-destructive/92 hover:shadow-md focus-visible:ring-destructive/35",
        outline:
          "border-2 border-border/90 bg-background/95 backdrop-blur-sm shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-border hover:shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary/35 shadow-sm hover:bg-secondary/85 hover:shadow-md",
        ghost:
          "border border-transparent shadow-none hover:bg-accent/65 hover:text-accent-foreground active:scale-[0.99]",
        link:
          "border-0 bg-transparent text-primary underline-offset-4 hover:underline shadow-none active:scale-100 h-auto min-h-0 px-1 py-1.5 hover:bg-transparent",
        /** Brand gold — primary marketing CTAs */
        gold:
          "bg-gold text-deep border border-gold/35 shadow-md shadow-gold/20 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/30",
        /** Dark bar with gold hover — final submit / emphasis */
        onyx:
          "bg-stone-900 text-white border border-stone-800/90 shadow-md hover:bg-gold hover:text-stone-950 hover:border-gold/45 hover:shadow-lg hover:shadow-gold/25",
      },
      size: {
        default: "h-10 min-h-10 px-5 py-2",
        xs: "h-7 min-h-7 rounded-lg px-2.5 text-xs gap-1",
        sm: "h-9 min-h-9 rounded-lg px-4 gap-1.5 text-xs",
        lg: "h-12 min-h-12 rounded-xl px-8 text-base gap-2",
        icon: "size-10 rounded-xl p-0",
        "icon-xs": "size-7 rounded-lg p-0 [&_svg]:size-3",
        "icon-sm": "size-9 rounded-xl p-0",
        "icon-lg": "size-11 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
