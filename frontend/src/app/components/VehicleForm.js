import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const VehicleForm = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [chassis, setChassis] = useState("");
  const [register, setRegister] = useState("");
  const [mileage, setMileage] = useState("");
  const [status, setStatus] = useState("");
  const [costPerDay, setCostPerDay] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState("");

  useEffect(() => {
    const tokenStored = localStorage.getItem("token");
    if (!tokenStored) {
      router.push("/login");
      return;
    }

    const decodedToken = jwtDecode(tokenStored);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    setToken(tokenStored);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Token not available");
      return;
    }

    const vehicle = {
      make,
      model,
      color,
      year,
      chassis,
      register,
      mileage,
      status,
      costPerDay,
      lastServiceDate,
      imageUrl,
    };

    const response = await fetch("http://localhost:3546/api/vehicle", {
      method: "POST",
      body: JSON.stringify(vehicle),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setMake("");
      setModel("");
      setColor("");
      setYear("");
      setChassis("");
      setRegister("");
      setMileage("");
      setStatus("");
      setCostPerDay("");
      setLastServiceDate("");
      setImageUrl;
      setError(null);
      console.log("New vehicle added", json);
    }
  };

  return (
    <form className="createVehicle" onSubmit={handleSubmit}>
      <p>Add New Vehicle</p>
      <label>Make: </label>
      <input
        type="text"
        onChange={(e) => setMake(e.target.value)}
        value={make}
      />
      <label>Model: </label>
      <input
        type="text"
        onChange={(e) => setModel(e.target.value)}
        value={model}
      />
      <label>Color: </label>
      <input
        type="text"
        onChange={(e) => setColor(e.target.value)}
        value={color}
      />
      <label>Year: </label>
      <input
        type="text"
        onChange={(e) => setYear(e.target.value)}
        value={year}
      />
      <label>Chassis: </label>
      <input
        type="text"
        onChange={(e) => setChassis(e.target.value)}
        value={chassis}
      />
      <label>Register: </label>
      <input
        type="text"
        onChange={(e) => setRegister(e.target.value)}
        value={register}
      />
      <label>Status: </label>
      <input
        type="text"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
      />
      <label>Mileage: </label>
      <input
        type="number"
        onChange={(e) => setMileage(e.target.value)}
        value={mileage}
      />
      <label>Cost per day: </label>
      <input
        type="number"
        onChange={(e) => setCostPerDay(e.target.value)}
        value={costPerDay}
      />
      <label>Last service date: </label>
      <input
        type="date"
        onChange={(e) => setLastServiceDate(e.target.value)}
        value={lastServiceDate}
      />
      <label>Image: </label>
      <input
        type="text"
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
      />
      <button type="submit">Add Vehicle</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default VehicleForm;
