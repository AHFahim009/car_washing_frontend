/* eslint-disable @typescript-eslint/no-explicit-any */

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
export default function ReviewSection() {
  return (
    <div className="mx-auto container  px-4 md:px-6 flex flex-col md:flex-row gap-12">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Sarah Johnson</h3>
              <time className="text-muted-foreground">2 days ago</time>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
          </div>
        </div>
        <div className="text-sm leading-loose text-muted-foreground">
          <p>
            I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been a
            versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some healthier
            options.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Alex Smith</h3>
              <time className="text-muted-foreground">3 weeks ago</time>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
          </div>
        </div>
        <div className="text-sm leading-loose text-muted-foreground">
          <p>
            The battery life is impressive, lasting me for long-haul flights without any issues. They are comfortable to
            wear for extended periods, and I appreciate the sleek design.
          </p>
        </div>
      </div>

      <Button variant={"outline"} className="my-auto text-black">
        show more
      </Button>
    </div>
  )
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
  )
}