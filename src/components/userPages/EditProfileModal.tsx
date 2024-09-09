/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppSelector } from "@/redux/hooks";

import { useState, useEffect } from "react";
import { CustomForm } from "../customForm/CustomForm";
import CustomInput from "../customForm/CustomInput";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { InputSkeleton } from "@/helpers/InputSkeleton";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/api/endpoints/userManagement.api";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TGenericErrRes } from "@/types/globa.types";

export default function EditProfileModal({
  showProfileModal,
  setShoProfileModal,
}: any) {
  const [showContent, setShowContent] = useState(true);
  const userId = useAppSelector((state) => state.auth.credentials.userId);
  const { data: loggedUser, isLoading } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const [userPhoto, setPhoto] = useState<any>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { name, photo, address, phone } = loggedUser?.data || {};

  useEffect(() => {
    if (!isLoading && loggedUser) {
      setTimeout(() => {
        setShowContent(false); // Delay data rendering by 2 seconds
      }, 100);
    }
    setPhotoPreview(photo);
  }, [photo]);
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setPhoto(file as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (userPayload: any) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(userPayload));

      if (userPhoto) {
        formData.append("photo", userPhoto);
      }

      // Make the API call via Redux

      const res = await updateUser({ userId, formData });
      if (res.data) {
        toast.message(res.data.message);
        setShoProfileModal(false);
      } else {
        const errRes = res.error as FetchBaseQueryError;
        const err = errRes.data as TGenericErrRes;
        toast.error(err.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Dialog
      open={showProfileModal}
      onOpenChange={() => setShoProfileModal(false)}
    >
      <DialogContent className="sm:max-w-[425px] h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        {showContent || isLoading ? (
          <InputSkeleton />
        ) : (
          <CustomForm
            onSubmit={handleSubmit}
            defaultValues={{
              name: name,
              phone: phone,
              address: address,
            }}
          >
            {/* image part: row */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={photoPreview!} alt="Profile photo" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-400 text-white text-2xl font-bold"></AvatarFallback>
                </Avatar>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full p-2 bg-white shadow-md hover:bg-gray-100 transition-colors"
                  onClick={() =>
                    document.getElementById("photo-upload")?.click()
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  <span className="sr-only">Upload photo</span>
                </Button>
              </div>
            </div>
            {/* rest of filed: row */}
            <CustomInput name="name" type="text" label="Name" />
            <CustomInput name="phone" type="text" label="phone" />
            <CustomInput name="address" type="text" label="address" />

            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </CustomForm>
        )}
      </DialogContent>
    </Dialog>
  );
}
