import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa"; // uncomment if you add Google sign-in

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {loginUser,signGoogle} = useAuth();
 const onSubmit = async(data) => {
    console.log(data);
try{
 await loginUser(data.email,data.password)
 navigate('/')
}catch(err){
  console.log(err)
}
 };

  const handleGoogleSignIn = async() => {
    // TODO: integrate Google sign-in logic
    // Example: signInWithPopup(auth, provider)
    console.log("Google Sign-In clicked");
   await signGoogle().then(()=>navigate('/'))
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Please Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Message */}
          {/* {message && (
            <p className="text-red-500 text-xs italic mb-4">{message}</p>
          )} */}

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Google Sign-In */}
        {/* Uncomment when you connect Google Sign-In */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            <FaGoogle /> Sign in with Google
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

        <p className="mt-5 text-center text-gray-400 text-xs">
          &copy;2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
