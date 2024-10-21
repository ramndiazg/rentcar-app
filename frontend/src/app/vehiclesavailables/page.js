"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VehiclesAvailables() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const goToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      //const name = localStorage.getItem("name");

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:3546/vehiclesavailables", {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <h1>VehiclesAvailables page</h1>
      <p>welcome </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>click for go to dashboard</p>
      <button
        onClick={goToHome}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        go to home page
      </button>
    </div>
  );
}
