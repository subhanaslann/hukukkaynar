import { forwardRef, InputHTMLAttributes } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, hint, className = '', ...rest },
  ref
) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        ref={ref}
        className={`mt-1 h-4 w-4 rounded border-primary-300 text-primary-700 focus:ring-primary-500 ${className}`}
        {...rest}
      />
      <label htmlFor={id} className="text-sm text-primary-700">
        {label}
        {hint && <span className="block text-xs text-primary-500">{hint}</span>}
      </label>
    </div>
  );
});

export default Checkbox;
