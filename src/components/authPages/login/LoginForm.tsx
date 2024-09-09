/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginUserMutation } from "@/redux/api/endpoints/userManagement.api";
import { CustomForm } from "../../customForm/CustomForm";
import CustomInput from "../../customForm/CustomInput";
import { Button } from "../../ui/button";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { addToUser } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TGenericErrRes } from "@/types/globa.types";
const LoginForm = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async (data: FieldValues) => {
    try {
      // Step 1: Call loginUser mutation with form data
      const response = await loginUser(data);

      if (response.data) {
        toast.success(response.data.message);

        if (response.data.token) {
          // Step 2: Decode the JWT token to get user credentials
          const useCredentials = jwtDecode(response.data.token) as any;
          // Step 3: Dispatch addToUser to update the auth state
          dispatch(
            addToUser({
              token: response.data.token,
              credentials: {
                userId: useCredentials._id,
                email: useCredentials.email,
                role: useCredentials.role,
                name: response.data.data.name,
                photo: response.data.data.photo
              },
            })
          );
        }

        navigate("/");
      } else {
        const err = response.error as FetchBaseQueryError;
        const errorRes = err.data as TGenericErrRes;

        toast.error(errorRes.message);
      }
    } catch (error) {
      // Handle any errors here

      console.error("Login page error:", error);
    }
  };
  return (
    <CustomForm onSubmit={handleFormSubmit}>
      <CustomInput
        name="email"
        type="text"
        placeholder="Enter your email"
        label="name"
      />
      <CustomInput
        name="password"
        type="password"
        placeholder="password"
        label="password"
      />
      <Button className="w-full" type="submit">
        Login in
      </Button>
    </CustomForm>
  );
};
export default LoginForm;
