import landing_car from "../../../assets/landing_Car.png";
import { Link } from "react-scroll";

const LandingPage = () => {
  return (

    <div
      style={{
        backgroundPosition: "center bottom",
        background: "cover",
        backgroundRepeat: "no-repeat"
      }}
      className=" bg-[url('https://kit.holylinedesign.com/autolux/wp-content/uploads/sites/16/2024/04/Hero-Section-Bg.png')] 
    bg-cover bg-center no-repeat pt-8 h-auto"
    >
      {/* <!-- Hero section text and button --> */}

      <div className="text-center container mx-auto px-4 ">
        <h1 className="text-4xl font-bold text-gray-800">
          Let us Handle the Dirt While
          <br /> You Enjoy the Shine
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Our journey began with a simple passion for keeping vehicles
        </p>
        {/* <!-- Call-to-action button --> */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
          Get Booking
        </button>
      </div>

      {/* <!-- Landing part --> */}
      <div
        style={{
          backgroundSize: "contain",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
        }}
        className="container mx-auto px-4  flex flex-col md:flex-row lg:flex-row 
     bg-[url('https://kit.holylinedesign.com/autolux/wp-content/uploads/sites/16/2024/04/Surface.png')] 
     h-auto 
     "
      >
        {/* <!-- Cards container --> */}
        <div className=" flex flex-col md:flex-row lg:flex-row items-center w-full  gap-6  md:gap-12 lg:gap-12 pb-8">
          {/* <!-- Card 1 --> */}


          <div className="rounded-lg p-4 landingCard w-full md:w-1/2 lg:w-1/2 mt-16 md:mt-0 lg:mt-0 cursor-pointer ">
            <Link to="feedbackForm"
              smooth={true}
              duration={500}  >
              <div className="flex items-center mb-2">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/016/017/388/original/transparent-like-feedback-icon-free-png.png"
                  alt="Car icon"
                  className="w-10 h-10"
                />
                <button className="text-lg font-bold ml-2">
                  Eco-Friendly Practices
                </button>
              </div>
              <p className="text-gray-700">
                No two cars are the same, and neither are our customers' needs
              </p>
            </Link>
          </div>


          {/* <!-- Image --> */}
          <div className="w-full md:w-1/2 lg:w-1/2">
            <img
              src={landing_car}
              alt=""
              className="w-full h-auto object-cover mx-auto"
            />
          </div>
          {/* <!-- Card 2 --> */}
          <div className="rounded-lg p-4 landingCard w-full md:w-1/2 lg:w-1/2 mb-4 md:mb-0 lg:mb-0 mt-16 md:mt-0 lg:mt-0 cursor-pointer">
            <Link to="feedbackForm"
              smooth={true}
              duration={500}>


              <div className="flex items-center mb-2">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/016/017/388/original/transparent-like-feedback-icon-free-png.png"
                  alt="Car icon"
                  className="w-10 h-10"
                />
                <span className="text-lg font-bold ml-2">
                  Give Feedback
                </span>
              </div>
              <p className="text-gray-700">
                We care about the environment as much as we care about your car.
              </p>
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- End of landing part --> */}
    </div>

  );
};
export default LandingPage;
