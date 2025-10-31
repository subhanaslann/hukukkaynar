import { redirect } from 'next/navigation';

interface PageProps {
  params: { locale: string };
}

export default function EkipPage({ params }: PageProps) {
  redirect(`/${params.locale}/ekibimiz`);
}
