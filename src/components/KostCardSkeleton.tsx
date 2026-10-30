import React from 'react';

interface KostCardSkeletonProps {
  /**
   * Number of skeleton cards to render in a grid.
   * If omitted or 1, renders a single skeleton card.
   */
  count?: number;
}

export const KostCardSkeleton: React.FC<KostCardSkeletonProps> = ({ count = 1 }) => {
  const cards = Array.from({ length: count });

  const renderSingleSkeleton = (index: number) => (
    <div
      key={`skeleton-${index}`}
      role="status"
      aria-busy="true"
      aria-label="Memuat informasi kost..."
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden relative"
    >
      {/* Shimmer sweep overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

      {/* Photo Container Skeleton */}
      <div className="relative h-52 sm:h-56 w-full bg-slate-200/80 animate-pulse overflow-hidden">
        {/* Top Badges Skeleton */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="h-6 w-20 bg-slate-300/80 rounded-md shadow-2xs" />
          <div className="h-6 w-28 bg-slate-300/70 rounded-md shadow-2xs" />
        </div>

        {/* Action Controls Skeleton on Top Right (Heart & Compare) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-lg bg-slate-300/80 shadow-2xs" />
          <div className="h-8 w-20 rounded-lg bg-slate-300/80 shadow-2xs hidden sm:block" />
        </div>

        {/* Distance Overlaid on Photo */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-300/90" />
          <div className="h-4 w-36 bg-slate-300/90 rounded" />
        </div>
      </div>

      {/* Content Body Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <div className="space-y-1.5">
            <div className="h-6 w-3/4 bg-slate-200 rounded-md animate-pulse" />
          </div>

          {/* Tagline */}
          <div className="space-y-1 pt-1">
            <div className="h-3.5 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-3.5 w-4/5 bg-slate-100 rounded animate-pulse" />
          </div>

          {/* Room Specification & Facility Legend Box Skeleton */}
          <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-2.5 shadow-2xs">
            {/* Header row */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-sky-200" />
                <div className="h-3 w-32 bg-slate-200 rounded" />
              </div>
              <div className="h-2.5 w-16 bg-slate-200 rounded" />
            </div>

            {/* Quick Specs Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="h-5 w-16 bg-slate-200/80 rounded border border-slate-200/50" />
              <div className="h-5 w-14 bg-slate-200/80 rounded border border-slate-200/50" />
              <div className="h-5 w-24 bg-slate-200/80 rounded border border-slate-200/50" />
              <div className="h-5 w-20 bg-slate-200/80 rounded border border-slate-200/50" />
            </div>

            {/* Amenities Preview Badges */}
            <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
              <div className="h-4 w-18 bg-slate-200/70 rounded" />
              <div className="h-4 w-16 bg-slate-200/70 rounded" />
              <div className="h-4 w-12 bg-slate-200/70 rounded" />
              <div className="h-4 w-24 bg-slate-200/70 rounded" />
            </div>
          </div>

          {/* Drawbacks / Notes Skeleton Box */}
          <div className="pt-2 bg-amber-50/40 rounded-xl p-2.5 border border-amber-200/40 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-200" />
              <div className="h-3 w-28 bg-amber-100 rounded" />
            </div>
            <div className="space-y-1 pl-4">
              <div className="h-2.5 w-11/12 bg-amber-100/80 rounded" />
              <div className="h-2.5 w-3/4 bg-amber-100/80 rounded" />
            </div>
          </div>
        </div>

        {/* Price & Action Row Skeleton */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="h-2.5 w-14 bg-slate-200 rounded" />
            <div className="h-6 w-28 bg-slate-200 rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-14 sm:w-16 bg-slate-100 rounded-xl" />
            <div className="h-8 w-20 sm:w-24 bg-orange-100 rounded-xl" />
          </div>
        </div>
      </div>
      <span className="sr-only">Memuat data kost...</span>
    </div>
  );

  if (count <= 1) {
    return renderSingleSkeleton(0);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
      {cards.map((_, i) => renderSingleSkeleton(i))}
    </div>
  );
};
