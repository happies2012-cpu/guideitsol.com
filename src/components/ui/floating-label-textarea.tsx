import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface FloatingLabelTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FloatingLabelTextarea = React.forwardRef<HTMLTextAreaElement, FloatingLabelTextareaProps>(
  ({ className, label, error, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = Boolean(value) || value === 0;

    return (
      <div className="relative">
        <Textarea
          ref={ref}
          className={cn(
            "pt-6 pb-2 min-h-[120px] peer",
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
            top: hasValue || isFocused ? "0.5rem" : "0.75rem",
            fontSize: hasValue || isFocused ? "0.75rem" : "1rem",
            y: hasValue || isFocused ? 0 : 0,
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

FloatingLabelTextarea.displayName = "FloatingLabelTextarea";

export { FloatingLabelTextarea };