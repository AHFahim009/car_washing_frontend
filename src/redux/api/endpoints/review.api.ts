import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST: Create a new review
    createReview: builder.mutation({
      query: (newReview) => ({
        url: "/reviews",
        method: "POST",
        body: newReview,
      }),
      invalidatesTags: [tagTypes.Review],
    }),
    // GET: Fetch all reviews
    getReviews: builder.query({
      query: () => "/reviews",
      providesTags: [tagTypes.Review],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
} = reviewApi;
