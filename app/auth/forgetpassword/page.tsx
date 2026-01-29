"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import CommonInputField from "../../component/inputfield";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { userDetailsInForgetPassword } from "@/redux/slices/forgetuserslice";
import { methodPostWithoutPost } from "@/app/component/service";

interface LoginDetails {
  userName: string;
}

export default function ForgetPassword(): JSX.Element {
  const [userDetails, setUSerDetails] = useState<LoginDetails>({
    userName: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUSerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await methodPostWithoutPost({
      data: userDetails,
      url: "/api/forgetpassword",
    });
    if (response.success === true) {
      router.push("/auth/resetpassword");
       dispatch(userDetailsInForgetPassword(userDetails.userName));
    }
   
  };

  const fields = [
    {
      label: "Username",
      name: "userName",
      type: "text",
      placeholder: "Enter User Name",
      value: userDetails.userName,
      onChange: handleOnChange,
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-400 to-navy-200
"
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md  bg-gradient-to-br from-blue-300 to-navy-200 rounded-2xl shadow-xl border border-gray-200 p-14 flex flex-col"
      >
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
            key={field.name}
            label={field.label}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            type={field.type}
          />
        ))}

        <button
          type="submit"
          className="w-full h-12 rounded-lg bg-blue-800 text-white font-semibold text-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Forget Password
        </button>
      </form>
    </div>
  );
}
