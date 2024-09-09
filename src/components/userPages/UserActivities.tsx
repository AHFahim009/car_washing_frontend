import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Pencil, User, PhoneCall } from "lucide-react";
import TestingUpcomingBooking from "./TestingUpcomingBooking";
import { useGetUserByIdQuery } from "@/redux/api/endpoints/userManagement.api";
import { useAppSelector } from "@/redux/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function UserActivities() {
  const userId = useAppSelector((state) => state.auth.credentials.userId)
  const { data: loggedUser, isLoading } = useGetUserByIdQuery(userId)
  const [showProfileModal, setShoProfileModal] = useState(false)

  const { name, email, photo, address, phone } = loggedUser?.data || {}

  const handleEditProfile = () => {
    setShoProfileModal(true)
  }


  return (
    <div>
      {/* profile section */}
      {
        isLoading ?
          <Card className="w-full bg-gradient-to-r from-purple-500 to-blue-600">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Skeleton className="w-32 h-32 rounded-full" />
                <div className="flex-1 w-full max-w-[300px] space-y-4">
                  <Skeleton className="h-8 w-3/4 mx-auto md:mx-0" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>

          :

          <>
            <Card className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="w-32 h-32   shadow-lg">
                    <AvatarImage src={photo} alt={name} />
                    <AvatarFallback className="">
                      <User className="h-12 w-12 text-purple-700" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2">{name}</h1>
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Mail className="w-5 h-5" />
                        <span>{email}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{address}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <PhoneCall className="w-5 h-5" />
                        <span>{phone}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                    onClick={handleEditProfile}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            {showProfileModal && <EditProfileModal showProfileModal={showProfileModal} setShoProfileModal={setShoProfileModal} />}
          </>
      }
      {/* profile section */}
      {/* booking section */}
      {/* <BookingSection /> */}
      <TestingUpcomingBooking />
    </div>
  );
}
