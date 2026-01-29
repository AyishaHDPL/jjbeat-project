"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import CommonInputField from "../../component/inputfield";
import Image from "next/image";
import { methodPostWithoutPost } from "../../component/service";
import { useAppDispatch } from "@/redux/hooks";
import { loginSuccess } from "@/redux/slices/authslice";

interface LoginDetails {
  userName: string;
  password: string;
}

export default function Login(): JSX.Element {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    userName: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await methodPostWithoutPost({
        data: loginDetails,
        url: "/api/login",
      });

      if (response?.success === true) {
        dispatch(
          loginSuccess({
            user: response.user,
            token: response.token,
          })
        );

        localStorage.setItem(
          "login",
          JSON.stringify({
            user: response.user,
            token: response.token,
          })
        );

        router.push("/frontend/dashboard");
      }
    } catch (error) {
      console.error("error occured", error);
    }
  };

  const fields = [
    {
      label: "Username",
      name: "userName",
      type: "text",
      placeholder: "Enter User Name",
      value: loginDetails.userName,
      onChange: handleOnChange,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      value: loginDetails.password,
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

        <div
          className="text-right mb-6"
          onClick={() => router.push("/auth/forgetpassword")}
        >
          <a className="text-sm text-blue-800 hover:underline font-medium cursor-pointer">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-lg bg-blue-800 text-white font-semibold text-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/auth/signup")}
            className="text-blue-800 font-semibold cursor-pointer hover:underline"
          >
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
}
