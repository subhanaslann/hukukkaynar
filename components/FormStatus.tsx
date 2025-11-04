interface FormStatusProps {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export default function FormStatus({ status, message }: FormStatusProps) {
  if (status === 'idle' || !message) {
    return null;
  }

  const baseClass =
    'rounded-md border gold-border bg-gold/10 px-4 py-3 text-sm text-[hsl(var(--gold))]';

  return <p className={baseClass}>{message}</p>;
}
