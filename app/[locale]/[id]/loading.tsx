export default function Loading() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back button skeleton */}
        <div className="h-6 w-40 bg-[hsl(var(--card))] rounded animate-pulse" />

        {/* Header skeleton */}
        <header className="mt-4 sm:mt-6 space-y-4">
          {/* Meta info skeleton */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-5 w-24 bg-[hsl(var(--card))] rounded animate-pulse" />
            <div className="h-5 w-2 bg-[hsl(var(--card))] rounded-full animate-pulse" />
            <div className="h-5 w-32 bg-[hsl(var(--card))] rounded animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="h-10 w-3/4 bg-[hsl(var(--card))] rounded animate-pulse" />

          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-20 bg-[hsl(var(--card))] rounded animate-pulse" />
            <div className="h-8 w-24 bg-[hsl(var(--card))] rounded animate-pulse" />
            <div className="h-8 w-28 bg-[hsl(var(--card))] rounded animate-pulse" />
          </div>
        </header>

        {/* Content skeleton */}
        <article className="mt-8 space-y-4">
          <div className="h-5 w-full bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-5 w-full bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-5 w-5/6 bg-[hsl(var(--card))] rounded animate-pulse" />
          <div className="h-5 w-full bg-[hsl(var(--card))] rounded animate-pulse" />

          {/* Source card skeleton */}
          <div className="mt-8 h-32 bg-[hsl(var(--card))] rounded-xl animate-pulse" />
        </article>

        {/* Disclaimer skeleton */}
        <aside className="mt-8 h-16 bg-[hsl(var(--card))] rounded animate-pulse" />
      </div>
    </section>
  );
}
