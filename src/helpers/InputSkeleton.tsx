
export const InputSkeleton = ({ length = 5 }: { length?: number }) => (
  <>
    {[...Array(length)].map((_, index) => (
      <div key={index} className="flex flex-col space-y-2">
        {/* Label Skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>

        {/* Input Skeleton */}
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ))}
  </>
);




export const EditSlotSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="space-y-2">
          {/* Skeleton for the label */}
          <div
            className={`h-4 bg-gray-200 rounded animate-pulse `}
          ></div>
          {/* Skeleton for the input */}
          <div
            className={`h-12 bg-gray-200 rounded animate-pulse '}`}
          ></div>
        </div>
      ))}
    </div>
  );
};

