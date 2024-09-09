import { StarIcon } from "lucide-react";

type TProps = {
  reviewData: {
    feedback: string;
    rating?: number;
  };
};

const ReviewCard = ({ reviewData }: TProps) => {
  const { feedback, rating = 3 } = reviewData;
  const truncatedFeedback = feedback.length > 80 ? feedback.substring(0, 80) + '...' : feedback;
  return (
    <div className=" w-full md:max-w-sm bg-blue-50 border border-gray-200 rounded-lg p-6  md:flex-1 reviewCard ">
      <div className="flex items-center gap-0.5 mb-6">
        {[...Array(rating)].map((_, i) => (
          <StarIcon key={i} className="w-5 h-5 fill-primary" />
        ))}
      </div>
      <p className="text-gray-800 text-lg mb-6 font-mono " >{truncatedFeedback}</p>
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full"
          src="https://via.placeholder.com/48"
          alt="Reviewer"
        />
        <div className="ml-4">
          <p className="text-gray-900 font-semibold">Sandy Wall</p>
          <p className="text-gray-500">Entrepreneur</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
