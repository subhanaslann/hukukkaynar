// This not-found.tsx is required at the root level
// when using next-intl with [locale] routing
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </body>
    </html>
  );
}
