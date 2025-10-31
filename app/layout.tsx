// Root layout - required by Next.js
// DO NOT add html/body tags here when using next-intl with [locale] folder
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
