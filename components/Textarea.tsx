import { forwardRef, TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, error, className = '', ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-[hsl(var(--muted))]">
        {label}
      </label>
      <textarea
        id={id}
        ref={ref}
        className={`w-full min-h-[160px] rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-[hsl(var(--fg))] shadow-sm placeholder:text-[hsl(var(--muted))] focus:border-[hsl(var(--gold))] ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-[hsl(var(--gold))]">{error}</p>}
    </div>
  );
});

export default Textarea;
