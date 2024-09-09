import FeatureCard from "./FeatureCard"
import { servicesData } from "@/constantData";


const Features = () => {
  return (
    <section className="mt-[5rem]">
      <div className="text-center mt-12 mb-8">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Our Features
        </h2>
      </div>
      <div className=" w-full  container px-4  mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((item, i) => (
          <FeatureCard key={i} cardData={item} />
        ))}
      </div>
    </section>
  )
}
export default Features