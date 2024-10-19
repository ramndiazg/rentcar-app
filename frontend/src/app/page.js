"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to rent car app</h1>
      <p>click to login</p>
      <button
        onClick={goToLogin}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Ir a Login
      </button>
    </div>
  );
}
