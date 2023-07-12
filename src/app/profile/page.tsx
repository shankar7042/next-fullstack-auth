"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCurrentUser() {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/users/me");
        setUser(data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/users/logout");
      toast.success("Logged out");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-center">
      <h1>Profile Page</h1>
      {loading && (
        <h1 className="my-4">
          <span className="bg-red-500 p-2 rounded-md">Loading...</span>
        </h1>
      )}
      {!loading && user && (
        <>
          <h1 className="my-4">
            Welcome{" "}
            <span className="bg-orange-400 p-2 rounded-md font-bold">
              {user.username}
            </span>{" "}
            with email{" "}
            <span className="bg-blue-500 p-2 rounded-md font-bold selection:bg-slate-800">
              {user.email}
            </span>
          </h1>
          {!user.verified && (
            <p>
              Please verify your email by clicking the link given in the mail
            </p>
          )}
        </>
      )}
      <button
        className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default page;
