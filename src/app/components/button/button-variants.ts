import { tv, VariantProps } from 'tailwind-variants';
const buttonVariants = tv({
  base: 'h-10 py-2 px-3 rounded cursor-pointer hover:opacity-75 focus:opacity-75 transition-colors disabled:pointer-events-none disabled:opacity-75',
  variants: {
    variant: {
      success: 'bg-emerald-600 text-white',
      danger: 'bg-danger text-danger-foreground',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
    },
  },
  defaultVariants: {
    variant: 'success',
    size: 'md',
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export { buttonVariants, type ButtonVariants };
