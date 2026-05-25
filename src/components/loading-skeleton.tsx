export function LoadingSkeleton() {
  return (
    <main className="dashboard-shell min-h-screen bg-background px-4 pb-28 pt-4 text-foreground md:px-6 md:pb-6">
      <span className="mesh-layer" />
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-[auto_minmax(0,1fr)] lg:gap-6">
        <aside className="glass-panel hidden h-[calc(100vh-32px)] w-20 animate-pulse rounded-lg md:block lg:w-64" />
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="glass-panel h-96 animate-pulse rounded-lg md:col-span-2 xl:col-span-3" />
          <article className="glass-panel h-40 animate-pulse rounded-lg" />
          {Array.from({ length: 4 }).map((_, index) => (
            <article key={index} className="glass-panel h-40 animate-pulse rounded-lg" />
          ))}
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={index} className="glass-panel h-72 animate-pulse rounded-lg" />
          ))}
        </section>
      </section>
    </main>
  );
}
