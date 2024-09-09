import { Clock, Droplet, ThumbsUp } from "lucide-react";

const HowWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 bg-gradient-to-b from-blue-100 to-blue-200 mt-[5rem]"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {[
            { icon: Droplet, text: "Choose Your Service" },
            { icon: Clock, text: "Set Your Schedule" },
            { icon: ThumbsUp, text: "Enjoy a Clean Car" },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full p-4 mb-4">
                <step.icon size={32} />
              </div>
              <p className="text-lg font-semibold text-gray-800">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowWorks;
