import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";

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
  const optionsStatus = ["available", "in use", "maintenance"];

  useEffect(() => {
    const tokenStored = localStorage.getItem("token");
    if (!tokenStored) {
      router.push("/");
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
      <FormControl>
        <FormLabel>Add New Vehicle</FormLabel>
        <TextField
          label="Make"
          type="text"
          variant="outlined"
          onChange={(e) => setMake(e.target.value)}
          value={make}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Model"
          type="text"
          variant="outlined"
          onChange={(e) => setModel(e.target.value)}
          value={model}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Color"
          type="text"
          variant="outlined"
          onChange={(e) => setColor(e.target.value)}
          value={color}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Year"
          type="text"
          variant="outlined"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Chassis"
          type="text"
          variant="outlined"
          onChange={(e) => setChassis(e.target.value)}
          value={chassis}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Register"
          type="text"
          variant="outlined"
          onChange={(e) => setRegister(e.target.value)}
          value={register}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <Autocomplete
          disablePortal
          options={optionsStatus}
          value={status}
          onChange={(e, newValue) => setStatus(newValue)}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
          renderInput={(params) => <TextField {...params} label="Status" />}
        />
        <TextField
          label="Mileage"
          type="text"
          variant="outlined"
          onChange={(e) => setMileage(e.target.value)}
          value={mileage}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Cost per day"
          type="text"
          variant="outlined"
          onChange={(e) => setCostPerDay(e.target.value)}
          value={costPerDay}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Last service date"
          type="date"
          variant="outlined"
          onChange={(e) => setLastServiceDate(e.target.value)}
          value={lastServiceDate}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Image Url"
          type="text"
          variant="outlined"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <Button
          type="submit"
          sx={{ width: 500, height: 50, backgroundColor: "blue", color: "red" }}
        >
          Add Vehicle
        </Button>

        {error && <div className="error">{error}</div>}
      </FormControl>
    </form>
  );
};

export default VehicleForm;
