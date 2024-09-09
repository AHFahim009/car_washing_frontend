/* eslint-disable @typescript-eslint/prefer-as-const */
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Star } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { useCreateReviewMutation } from "@/redux/api/endpoints/review.api";

export default function ReviewFormCard() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const controls = useAnimation();

  const [createReview] = useCreateReviewMutation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback || !rating) {
      toast.warning("give your feedback please");
      return
    }
    const newReview = { feedback: feedback, rating: rating };
    try {
      const res = await createReview(newReview);
      if (res.data) {
        setIsSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        toast.warning("Try again please!!");
      }
    } catch (error) {
      console.error("Failed to create review", error);
    }
  };

  const starVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.2, y: -5 },
    tap: { scale: 0.95, y: 0 },
  };

  const submitButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
      },
    },
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="max-w-md mx-auto p-6 mb-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg text-center"
      >
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="text-2xl font-bold text-purple-800 mb-4"
        >
          Thank You!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-purple-600"
        >
          Your feedback has been submitted successfully.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg"
    >
      <motion.h2
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="text-2xl font-bold text-purple-800 mb-4"
      >
        Leave a Review
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-purple-700 mb-1"
          >
            Rating
          </label>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.label
                key={star}
                variants={starVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={controls}
              >
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={() => setRating(star)}
                  className="sr-only"
                />
                <Star
                  className={`w-8 h-8 cursor-pointer ${star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              </motion.label>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-purple-700 mb-1"
          >
            Your Feedback
          </label>
          <motion.textarea
            id="feedback"
            rows={4}
            className="w-full px-3 py-2 text-purple-700 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Tell us about your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            whileFocus={{ boxShadow: "0 0 0 2px rgba(167, 139, 250, 0.5)" }}
            animate={{
              borderRadius: ["16px", "24px", "16px"],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          ></motion.textarea>
        </motion.div>
        <motion.button
          type="submit"
          variants={submitButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate="pulse"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Submit Review
        </motion.button>
      </form>
    </motion.div>
  );
}
