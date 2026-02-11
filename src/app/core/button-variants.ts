import { tv, VariantProps } from 'tailwind-variants';
const buttonVariants = tv({
  base: 'h-10 py-1.5 px-3 font-semibold rounded-md cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-75 flex items-center justify-center',
  variants: {
    variant: {
      default:
        'bg-muted text-foreground border-border/40 hover:bg-muted/40 focus-visible:bg-muted/40 border',
      success:
        'bg-success text-success-foreground border-border hover:bg-success/75 focus-visible:bg-success/75 border',
      danger:
        'bg-danger text-danger-foreground border-border hover:bg-danger/75 focus-visible:bg-danger/75 border',
      ghost: 'bg-transparent text-foreground hover:bg-foreground/10 focus-visible:bg-foreground/10',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export { buttonVariants, type ButtonVariants };
