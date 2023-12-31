"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const { email, password } = state;

  useEffect(() => {
    if (!state.email || !state.password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [state.email, state.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setDisabled(true);
      const res = await axios.post("/api/users/login", state);
      setState({ email: "", password: "" });
      toast.success("Logged In");
      setDisabled(false);
      router.push("/profile");
    } catch (error: any) {
      toast.error("Incorrect credentials");
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-1/2 p-4 bg-slate-400 rounded-lg shadow-lg text-black">
        <h2 className="text-4xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mb-2">
            <label className="ml-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="p-2 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label className="ml-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              className="p-2 rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="mt-4 py-2 px-8 bg-purple-800 text-white rounded-md hover:bg-purple-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-blue-700 hover:underline">
          <Link href="/forgotpassword">Forgot Password</Link>
        </p>
        <p className="mt-4 text-sm text-neutral-700">
          Not a user Sign up{" "}
          <span className="text-blue-700 hover:underline">
            <Link href="/register">Click here</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
