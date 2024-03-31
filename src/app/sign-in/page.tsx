"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { login } from "@/actions/user";

interface userDetails {
  email: string;
  password_hash: string;
}

const Page = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password_hash: "",
  });

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  async function onSubmit() {
    try {
      console.log(userDetails);
      const res = await login(userDetails);
      console.log(res);
      if (!res.success) {
        alert("Incorrect Username and password");
      } else {
        if (res.user.user_type === "Buyer") {
          window.location.href = "/dashboard/buyer";
        } else if (res.user.user_type === "Seller") {
          window.location.href = "/dashboard/seller";
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <Image
          className="mx-auto h-10 w-auto"
          src=""
          alt="Your Company"
          width={40}
          height={40}
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) =>
                  setUserDetails({
                    email: e.target.value,
                    password_hash: userDetails.password_hash,
                  })
                }
                className="block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-[#a16207] hover:text-black"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    password_hash: e.target.value,
                  })
                }
                className="block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={onSubmit}
              disabled={!userDetails.email || !userDetails.password_hash}
              className="flex w-full justify-center rounded-md bg-[#000000] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#a16207] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not registered yet?{" "}
          <Link
            href="/sign-up"
            className="font-semibold leading-6 text-[#a16207] hover:text-black"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
