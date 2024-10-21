"use client";

import { useRouter } from "next/navigation";
import Appbar from "./components/Appbar"

export default function Home() {
  const router = useRouter();

  // const goToLogin = () => {
  //   router.push("/login");
  // };

  const goToAvailableVehicles = () => {
    router.push("/vehiclesavailables");
  };

  return (
    <div className="Home" style={{ textAlign: "center", padding: "50px" }}>
      <Appbar />
      <header className="Home-header">
        <p>
         
        </p>
      </header>
      {/* <h1>Welcome to rent car app</h1>
      <p>click to login</p>
      <button
        onClick={goToLogin}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        go to login page
      </button> */}
      <p>show the available vehicles</p>
      <button
        onClick={goToAvailableVehicles}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        go to vehicle available page
      </button>
    </div>
  );
}
