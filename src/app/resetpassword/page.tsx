"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const forgotPasswordToken = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!password || !confirmPassword) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/resetpassword", {
        forgotPasswordToken,
        password,
      });
      setLoading(false);
      toast.success("Password reset successful");
      toast.success("Please login with new credentials");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-1/2 p-4 bg-slate-400 rounded-lg shadow-lg text-black">
        <h2 className="text-4xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mb-2">
            <label className="ml-1" htmlFor="password1">
              Password
            </label>
            <input
              type="password"
              name="password1"
              id="password1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label className="ml-1" htmlFor="password2">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 rounded-lg focus:outline-none"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={disabled}
            className="mt-4 py-2 px-8 bg-purple-800 text-white rounded-md hover:bg-purple-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
