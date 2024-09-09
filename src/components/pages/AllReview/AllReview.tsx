/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, User } from "lucide-react";
import { useGetReviewsQuery } from "@/redux/api/endpoints/review.api";
import { useEffect } from "react"


export default function AllReview() {
  const { data: reviewData, isLoading } = useGetReviewsQuery("");
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const skeletonArray = [1, 2, 3, 4, 5, 6]; // Number of skeleton items you want

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-100 to-indigo-200 py-28">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Customer Reviews
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton placeholders
            <>
              {skeletonArray.map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
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
              ))}
            </>
          ) : (
            // Actual review content
            <>
              {reviewData.data.map((review: any, index: any) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <User className="h-10 w-10 text-gray-400 mr-4" />
                      <div className="text-sm font-medium text-gray-900">
                        Customer {index + 1}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{review.feedback}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}