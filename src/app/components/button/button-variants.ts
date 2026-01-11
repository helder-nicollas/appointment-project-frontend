import { tv, VariantProps } from 'tailwind-variants';
const buttonVariants = tv({
  base: 'h-10 py-1.5 px-3 font-semibold border rounded-md cursor-pointer hover:opacity-75 focus:opacity-75 transition-opacity disabled:pointer-events-none disabled:opacity-75',
  variants: {
    variant: {
      default: 'bg-muted text-foreground border-border/40',
      success: 'bg-success text-success-foreground border-border',
      danger: 'bg-danger text-danger-foreground border-border',
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
