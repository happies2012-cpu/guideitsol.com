import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
        outline:
          "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground shadow hover:shadow-md", // Explicitly set text-foreground
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg hover:shadow-xl",
        ghost: "hover:bg-accent hover:text-accent-foreground text-foreground hover:shadow-md", // Explicitly set text-foreground
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonElementProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface ButtonProps
  extends ButtonElementProps,
    VariantProps<typeof buttonVariants>,
    Omit<MotionProps, keyof ButtonElementProps> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, whileHover, whileTap, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Default animations
    const defaultWhileHover = variant === "link" ? { scale: 1.05 } : { scale: 1.05, y: -2 };
    const defaultWhileTap = { scale: 0.95 };
    
    return (
      <motion.div
        whileHover={whileHover || defaultWhileHover}
        whileTap={whileTap || defaultWhileTap}
        className="inline-block"
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };