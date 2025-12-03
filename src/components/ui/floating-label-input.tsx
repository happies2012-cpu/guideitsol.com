import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, error, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = Boolean(value) || value === 0;

    return (
      <div className="relative">
        <Input
          ref={ref}
          className={cn(
            "pt-6 pb-2 peer",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        <motion.label
          className={cn(
            "absolute left-3 text-sm text-muted-foreground pointer-events-none transition-all duration-200",
            error && "text-destructive"
          )}
          initial={false}
          animate={{
            top: hasValue || isFocused ? "0.5rem" : "50%",
            fontSize: hasValue || isFocused ? "0.75rem" : "1rem",
            y: hasValue || isFocused ? 0 : "-50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {label}
        </motion.label>
        
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-sm text-destructive mt-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };