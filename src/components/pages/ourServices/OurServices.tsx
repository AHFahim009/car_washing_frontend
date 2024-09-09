import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceManagement.api";
import ServiceCard from "./ServiceCard";
import { useEffect } from "react";
import CardSkeleton from "@/helpers/CardSkeleton";
export default function OurServices() {
  const { data: OurServices, isLoading } = useGetAllServicesQuery("");
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-24 container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12 justify-items-center ">
      {isLoading ? (
        <>
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          {OurServices?.data.map((item) => (
            <ServiceCard key={item._id} service={item} />
          ))}
        </>
      )}
    </div>
  );
}
