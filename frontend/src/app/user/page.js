"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserDetails from "../components/Userdetails";

export default function User() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:3546/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <h1>User page</h1>
      {data && data.map((user) => <UserDetails key={user._id} user={user}/>)}
      <p>click for go to dashboard</p>
      <button
        onClick={goToDashboard}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        go to dashboard page
      </button>
    </div>
  );
}
