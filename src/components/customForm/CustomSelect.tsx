import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,

  FormMessage,
} from "../ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { TCreateServiceRes } from "@/types/interface/createService.interface";
import { vehicles } from "@/validation/booking.validation";

type TProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options?: TCreateServiceRes[]
};

const CustomSelect = ({ name }: TProps) => {
  const formContext = useFormContext();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="">
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>

                {Object.entries(vehicles).map(([label, value]) => (
                  <SelectItem key={value} value={value}>
                    {label.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>


          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
