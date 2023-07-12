"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token?.length && token.length > 0) {
      verifyEmail();
    }
  }, []);

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("User verified");
    } catch (error: any) {
      setVerified(false);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1>Verify Email</h1>
      {loading && <p>Processing...</p>}
      {!loading && verified && (
        <>
          <p>You verified successfully. Click below to login</p>
          <Link
            className="bg-purple-700 font-bold px-4 py-2 rounded-md mt-4"
            href="/login"
          >
            Click me
          </Link>
        </>
      )}
    </div>
  );
};

export default page;
