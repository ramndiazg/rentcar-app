"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const goToVehicle = () => {
    router.push("/vehicle");
  };
  const goToClient = () => {
    router.push("/client");
  };
  const goToUser = () => {
    router.push("/user");
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

      const res = await fetch("http://localhost:3546/api/dashboard", {
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
      <h1>Dashboard page</h1>
      <p>welcome </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>click for go to vehicle</p>
      <button
        onClick={goToVehicle}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        go to vehicle page
      </button>
      <p>click for go to client</p>
      <button
        onClick={goToClient}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        go to client page
      </button>
      <p>click for go to user</p>
      <button
        onClick={goToUser}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        go to user page
      </button>
    </div>
  );
}
