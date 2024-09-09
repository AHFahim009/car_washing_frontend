/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { CustomForm } from "@/components/customForm/CustomForm";
import CustomInput from "@/components/customForm/CustomInput";
import { FieldValues } from "react-hook-form";
import { useSignUpUserMutation } from "@/redux/api/endpoints/userManagement.api";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TGenericErrRes } from "@/types/globa.types";

export default function Register() {
  const [userPhoto, setPhoto] = useState<any>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [createUser, { isLoading: isUserCreate }] = useSignUpUserMutation();
  const navigate = useNavigate()

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

  const handleSubmit = async (userPayload: FieldValues) => {
    try {
      // Step 1: Create FormData
      const formData = new FormData();
      formData.append("photo", userPhoto);
      formData.append("data", JSON.stringify(userPayload));

      // Step 2: Call createUser mutation with formData
      const res = await createUser(formData);

      if (res.data) {
        navigate("/login")
        toast.success(res.data.message);
      } else {
        const err = res.error as FetchBaseQueryError;
        const errorRes = err.data as TGenericErrRes;

        toast.error(errorRes.message);
      }
    } catch (error) {
      console.log("register page internal problem", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 pt-8 pb-4">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] bg-fixed"></div>
      <Card className="w-full max-w-2xl mx-auto relative z-10 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Join our community and start your journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomForm onSubmit={handleSubmit}>
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
            <div className="grid md:grid-cols-2 gap-4">
              <CustomInput
                name="name"
                label="Your Name"
                placeholder="Enter your name"
                type="text"
              />
              <CustomInput
                name="email"
                label="Your Email"
                placeholder="Enter your email"
                type="text"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <CustomInput
                name="password"
                label="Your password"
                placeholder="Enter your password"
                type="password"
              />
              <CustomInput
                name="phone"
                label="Your Contact"
                placeholder="Enter your contact "
                type="text"
              />
            </div>
            <CustomInput
              name="address"
              label="Your address"
              placeholder="Enter your address"
              type="text"
            />
            {isUserCreate ? (
              <button>Loading..</button>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                type="submit"
              >
                Register
              </Button>
            )}
          </CustomForm>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
            >
              Log in here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
