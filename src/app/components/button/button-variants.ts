import { tv, VariantProps } from 'tailwind-variants';
const buttonVariants = tv({
  base: 'h-10 py-1.5 px-3 font-semibold border rounded-md cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-75',
  variants: {
    variant: {
      default:
        'bg-muted text-foreground border-border/40 hover:bg-muted/75 focus-visible:bg-muted/75',
      success:
        'bg-success text-success-foreground border-border hover:bg-success/75 focus-visible:bg-success/75',
      danger:
        'bg-danger text-danger-foreground border-border hover:bg-danger/75 focus-visible:bg-danger/75',
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
