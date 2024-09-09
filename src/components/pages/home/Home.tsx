import ReviewFormCard from "./reviewForm/ReviewFormCard";
import BannerSection from "./Banner";
import HowWorks from "./HowWorks";
import Features from "./features/Features";
import Reviews from "./review/Reviews";

const Home = () => {
  return (
    <>
      {/* <LandingPage /> */}
      <BannerSection />
      {/* Feature */}
      <Features />

      <HowWorks />

      {/* reviews */}
      <Reviews />
      <section className="container mx-auto px-4 mt-[5rem]">
        <ReviewFormCard />
      </section>
    </>
  );
};
export default Home;
