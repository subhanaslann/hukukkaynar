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
      <label htmlFor={id} className="text-sm font-medium text-primary-800">
        {label}
      </label>
      <textarea
        id={id}
        ref={ref}
        className={`w-full min-h-[160px] rounded-md border border-primary-200 bg-white px-3 py-2 text-primary-900 shadow-sm focus:border-primary-500 ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

export default Textarea;
