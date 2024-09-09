/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";


type TProps = {
  selectedRating: any; setSelectedRating: any
}

export function StarRating({ selectedRating, setSelectedRating }: TProps) {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleRatingChange = (value: any) => {
    setSelectedRating(value);
  };

  const handleMouseEnter = (value: any) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  return (
    <RadioGroup
      aria-label="Rating"
      className="flex items-center gap-2"
      value={selectedRating}
      onValueChange={handleRatingChange}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Label
          key={value}
          htmlFor={`rating-${value}`}
          className={`cursor-pointer transition-colors ${selectedRating >= value || hoveredRating! >= value
            ? "text-black"
            : "text-muted-foreground hover:text-black"
            }`}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        >
          <RadioGroupItem
            value={value.toString()}
            id={`rating-${value}`}
            className="peer sr-only"
          />
          <StarIcon
            className={`w-8 h-8 fill-current ${selectedRating >= value || hoveredRating! >= value
              ? "text-black"
              : "text-muted-foreground hover:text-black"
              }`}
          />
        </Label>
      ))}
    </RadioGroup>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
