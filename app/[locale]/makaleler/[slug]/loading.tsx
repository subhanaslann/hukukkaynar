export default function Loading() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back button skeleton */}
        <div className="h-6 w-40 bg-[hsl(var(--card))] rounded animate-pulse" />

        {/* Header skeleton */}
        <header className="mt-4 sm:mt-6 space-y-4">
          <div className="h-4 w-32 bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-10 w-3/4 bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-6 w-full bg-[hsl(var(--card))] rounded animate-pulse" />
        </header>

        {/* Content skeleton */}
        <article className="mt-6 sm:mt-8 space-y-4">
          <div className="h-4 w-full bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-4 w-full bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-4 w-full bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="mt-8 h-4 w-full bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-4 w-full bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-[hsl(var(--card))] rounded animate-pulse" />
        </article>

        {/* Disclaimer skeleton */}
        <aside className="mt-6 sm:mt-8 h-16 bg-[hsl(var(--card))] rounded animate-pulse" />
      </div>
    </section>
  );
}
