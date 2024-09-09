import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, CreditCard, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardComponentProps {
  service: {
    _id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
  };
}

const ServiceCard: React.FC<CardComponentProps> = ({ service }) => {
  const navigate = useNavigate();
  const serviceId = service._id;

  const handleService = () => {
    // Navigates to the dynamic route with the service ID
    navigate(`/serviceDetails/${serviceId}`);
  };

  return (
    <Card onClick={handleService} className="bg-slate-50 w-full md:w-[360px] px-6 py-16 rounded-lg shadow-lg border-2 cursor-pointer text-center relative transition-all duration-300 group hover:border-red-700">
      <div className="flex gap-4">
        <div className="flex-shrink-0 mr-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Calendar />
          </div>
        </div>
        <div className="w-[70%] ">
          <CardHeader className="p-0">
            <h2 className="text-xl font-bold text-start">{service.name}</h2>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-gray-600 mt-2 text-start">
              {service.description}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between items-center mt-4 p-0 gap-3">
            <div className="flex items-center text-red-600">
              <Calendar className="w-5 h-5 mr-1" />
              <span>{service.duration}</span>
            </div>
            <div className="flex items-center text-red-600">
              <CreditCard className="w-5 h-5 mr-1" />
              <span>${service.price}</span>
            </div>
          </CardFooter>
        </div>
      </div>
      {/* Plus Icon: Initially hidden, shown on hover */}
      <button className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:animate-out">
        <Plus className="w-6 h-6" />
      </button>

    </Card>


  );
};

export default ServiceCard;
