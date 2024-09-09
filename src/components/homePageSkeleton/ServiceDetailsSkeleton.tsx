export const ServiceSkeleton = () => {
  return (
    <div className="">
      {/* Title Skeleton */}
      <div className="h-8 w-1/2 bg-gray-300 animate-pulse mb-4"></div>

      {/* Description Skeleton */}
      <div className="h-4 w-full bg-gray-300 animate-pulse mb-6"></div>
      <div className="h-4 w-4/5 bg-gray-300 animate-pulse mb-6"></div>

      {/* Price and Duration Skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-6 w-16 bg-gray-300 animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-300 animate-pulse"></div>
      </div>

      {/* Calendar Skeleton */}
      <div className="grid grid-cols-7 gap-1">
        {Array(7 * 6) // Assuming a 6-week calendar view
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="h-10 w-10 bg-gray-300 animate-pulse rounded"
            ></div>
          ))}
      </div>
    </div>
  );
};

export const AvailableSlotSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array(6) // Assuming 6 skeleton buttons as placeholders
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="h-10 w-full bg-gray-300 animate-pulse rounded"
          ></div>
        ))}
    </div>
  )
}