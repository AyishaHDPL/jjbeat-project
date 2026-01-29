"use client";

import { ChangeEvent, FormEvent, JSX, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { methodPostWithoutPost } from "@/app/component/service";
import CommonInputField from "@/app/component/inputfield";

interface LoginDetails {
  userName: string;
  password: string;
  role: string;
  conformPassword: string;
}

export default function SignUp(): JSX.Element {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    userName: "",
    password: "",
    role: "",
    conformPassword: "",
  });
  const router = useRouter();

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await methodPostWithoutPost({
        data: loginDetails,
        url: "/api/signup",
      });
      console.log(response, "response");
      if (response?.success === true) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("error occurred", error);
    }
  };

  const fields = [
    {
      label: "UserName",
      name: "userName",
      type: "text",
      placeholder: "Enter User Name",
      value: loginDetails.userName,
      onchange: handleOnchange,
    },
    {
      label: "Role",
      name: "role",
      type: "text",
      placeholder: "Enter Role",
      value: loginDetails.role,
      onchange: handleOnchange,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      value: loginDetails.password,
      onChange: handleOnchange,
    },
    {
      label: "Conform Password",
      name: "conformPassword",
      type: "conformPassword",
      placeholder: "Enter conform password",
      value: loginDetails.conformPassword,
      onChange: handleOnchange,
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                bg-gradient-to-br from-blue-400 to-navy-200"
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md  bg-gradient-to-br from-blue-300 to-navy-200 rounded-2xl shadow-xl border border-gray-200 p-14 flex flex-col"
      >
        {/* Title */}
        <div className="flex items-center justify-center gap-1 mb-6">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />

          <h4 className="text-lg font-semibold text-blue-800 leading-tight">
            Harness Digitech Private Limited
          </h4>
        </div>
        {fields.map((field) => (
          <CommonInputField
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={handleOnchange}
          />
        ))}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full h-12 rounded-lg bg-blue-600 mt-6 text-white
                 font-semibold text-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
