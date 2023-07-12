"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!email) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/users/forgotpassword", { email });
      toast.success("Email sent for reset Password");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setEmail("");
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-1/2 p-4 bg-slate-400 rounded-lg shadow-lg text-black">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mb-2">
            <label className="ml-1" htmlFor="email">
              Your Email Id:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="mt-4 py-2 px-8 bg-purple-800 text-white rounded-md hover:bg-purple-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
