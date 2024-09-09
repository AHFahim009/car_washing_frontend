const CardSkeleton = () => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 w-full"
    >
      <div className="p-6 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 bg-gray-300 rounded-full mr-4"></div>
          <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-4 w-full bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded-md mb-4"></div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-5 w-5 bg-gray-300 rounded-full mr-1"
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CardSkeleton