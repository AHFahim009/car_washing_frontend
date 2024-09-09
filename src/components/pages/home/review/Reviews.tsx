/* eslint-disable @typescript-eslint/no-explicit-any */
import ReviewCard from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetReviewsQuery } from "@/redux/api/endpoints/review.api";

const Reviews = () => {
  const { data: reviewData, isLoading } = useGetReviewsQuery("");
  const skeletonArray = [1, 2]; // Number of skeleton items you want

  return (
    <section className="mt-[5rem] ">
      <div className="text-center  mb-8">
        <h2 className="text-3xl font-bold text-center text-black ">
          Customer Reviews
        </h2>
      </div>
      <div className="mt-8 container px-4 mb-8 flex gap-8 justify-center  flex-wrap ">
        {isLoading ? (
          <>
            {skeletonArray.map((_, index) => (
              <div
                key={index}
                className="w-full md:max-w-sm bg-blue-50 border border-gray-200 rounded-lg p-6  md:flex-1 reviewCard"
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
          <>
            {reviewData?.data.slice(-2).map((review: any, i: number) => (
              <ReviewCard key={i} reviewData={review} />
            ))}
          </>
        )}

        <Button variant={"outline"} className="my-auto text-black">
          <Link className="" to={"/allReview"}>
            show more
          </Link>
        </Button>
      </div>
    </section>
  );
};
export default Reviews;
