interface FormStatusProps {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export default function FormStatus({ status, message }: FormStatusProps) {
  if (status === 'idle' || !message) {
    return null;
  }

  const baseClass =
    status === 'success'
      ? 'rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800'
      : 'rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800';

  return <p className={baseClass}>{message}</p>;
}
