import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ id, label, error, className = '', ...rest }, ref) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-[hsl(var(--muted))]">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={`w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-[hsl(var(--fg))] shadow-sm placeholder:text-[hsl(var(--muted))] focus:border-[hsl(var(--gold))] ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-[hsl(var(--gold))]">{error}</p>}
    </div>
  );
});

export default Input;
