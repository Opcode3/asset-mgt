export function TableSkeleton({ rows = 6, columns = 6 }) {
  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div
        className="bg-gray-100 grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="p-3">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid border-t border-gray-200"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="p-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
