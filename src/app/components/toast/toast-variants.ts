import { tv, VariantProps } from 'tailwind-variants';

const toastVariants = tv({
  base: 'absolute z-10 h-16 rounded-md toast shadow-md border border-gray-600',
  variants: {
    variant: {
      success: 'bg-secondary text-success-foreground',
      danger: 'bg-danger text-danger-foreground',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

type ToastVariants = VariantProps<typeof toastVariants>;

export { toastVariants, type ToastVariants };
