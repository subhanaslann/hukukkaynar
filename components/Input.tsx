import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ id, label, error, className = '', ...rest }, ref) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-primary-800">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={`w-full rounded-md border border-primary-200 bg-white px-3 py-2 text-primary-900 shadow-sm focus:border-primary-500 ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

export default Input;
