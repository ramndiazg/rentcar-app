"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClientDetails from "../components/ClientDetails";
import ClientForm from "../components/ClientForm";
import Appbar from "../components/Appbar";

export default function Client() {
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

      const res = await fetch("http://localhost:3546/api/client", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <Appbar />
      <div className="" style={{ textAlign: "center", padding: "50px" }}>
        <h1>Client page</h1>
        <ClientForm />
        {data &&
          data.map((client) => (
            <ClientDetails key={client._id} client={client} />
          ))}
      </div>
    </div>
  );
}
