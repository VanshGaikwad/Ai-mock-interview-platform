"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
// for user data
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createContext } from "vm";

function Provider({ children }: any) {
  // Get all user information
  const { user } = useUser();
  const CreateUser = useMutation(api.users.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imgUrl: user?.imageUrl,
        name: user?.fullName ?? "",
      });
      console.log(result);
      setUserDetail(result);
    }
  };

  return (
    <UserDetailContext value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext>
  );
}

export default Provider;

export const useUserDetailContext = () => {
  return createContext(UserDetailContext);
};
