"use client";



function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted-foreground/10 dark:bg-muted-foreground/5 rounded ${className}`}
    />
  );
}

export function CategorySkeleton() {
  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 space-y-12">
      <div className="space-y-3">
        <SkeletonPulse className="h-10 w-64" />
        <SkeletonPulse className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl border border-border/50 text-center space-y-4">
            <SkeletonPulse className="h-12 w-12 rounded-full mx-auto" />
            <SkeletonPulse className="h-4 w-28 mx-auto" />
            <SkeletonPulse className="h-3 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SubCategorySkeleton() {
  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 space-y-12">
      <div className="space-y-3">
        <SkeletonPulse className="h-10 w-72" />
        <SkeletonPulse className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl border border-border/50 space-y-4">
            <SkeletonPulse className="h-36 w-full rounded-xl" />
            <SkeletonPulse className="h-5 w-48" />
            <SkeletonPulse className="h-3 w-64" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceTypeSkeleton() {
  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 space-y-12">
      <div className="space-y-3">
        <SkeletonPulse className="h-10 w-80" />
        <SkeletonPulse className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl border border-border/50 flex gap-4">
            <SkeletonPulse className="h-24 w-24 rounded-lg shrink-0" />
            <div className="flex-1 space-y-3">
              <SkeletonPulse className="h-5 w-40" />
              <SkeletonPulse className="h-3 w-full" />
              <SkeletonPulse className="h-3 w-5/6" />
              <SkeletonPulse className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceDetailSkeleton() {
  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-4 md:px-6 relative">
      <div className="flex items-center gap-2 mb-6">
        <SkeletonPulse className="h-3 w-16" />
        <SkeletonPulse className="h-3 w-3" />
        <SkeletonPulse className="h-3 w-16" />
        <SkeletonPulse className="h-3 w-3" />
        <SkeletonPulse className="h-3 w-28" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side sticky details mock */}
        <div className="hidden lg:block w-64 xl:w-72 shrink-0 space-y-6">
          <div className="space-y-3">
            <SkeletonPulse className="h-10 w-full" />
            <SkeletonPulse className="h-4 w-32" />
          </div>
          <div className="glass rounded-2xl border border-border p-6 space-y-4">
            <SkeletonPulse className="h-5 w-32" />
            <div className="grid grid-cols-2 gap-3">
              <SkeletonPulse className="h-16 w-full rounded-xl" />
              <SkeletonPulse className="h-16 w-full rounded-xl" />
            </div>
          </div>
        </div>

        {/* Right side flow */}
        <div className="flex-1 w-full space-y-8">
          <SkeletonPulse className="h-[280px] w-full rounded-3xl" />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <SkeletonPulse className="h-8 w-48" />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="glass h-[400px] rounded-[2rem] border border-border/50 flex flex-col justify-between p-6">
                  <SkeletonPulse className="h-[70%] w-full rounded-xl" />
                  <div className="space-y-2 mt-4">
                    <SkeletonPulse className="h-5 w-48" />
                    <SkeletonPulse className="h-4 w-32" />
                  </div>
                </div>
                <div className="glass h-[400px] rounded-[2rem] border border-border/50 flex flex-col justify-between p-6">
                  <SkeletonPulse className="h-[70%] w-full rounded-xl" />
                  <div className="space-y-2 mt-4">
                    <SkeletonPulse className="h-5 w-48" />
                    <SkeletonPulse className="h-4 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
