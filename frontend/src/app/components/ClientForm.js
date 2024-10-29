import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ClientForm = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState("");
  const optionsStatus = ["blocked", "regular", "premium"];
  const optionsPayment = ["cash", "credit card", "debit card"];

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

    const client = {
      firstName,
      lastName,
      phone,
      email,
      address,
      membershipStatus,
      preferredPaymentMethod,
    };

    const response = await fetch("http://localhost:3546/api/client", {
      method: "POST",
      body: JSON.stringify(client),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setMembershipStatus("");
      setPreferredPaymentMethod("");
      setError(null);
      console.log("New client added", json);
    }
  };

  return (
    <form className="createClient" onSubmit={handleSubmit}>
      <p>Add New Client</p>
      <label>First Name: </label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label>Last Name: </label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <label>Phone: </label>
      <input
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />
      <label>Email: </label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Address: </label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <label>MembershipStatus: </label>
      <Autocomplete
        disablePortal
        options={optionsStatus}
        value={membershipStatus}
        onChange={(e, newValue) => setMembershipStatus(newValue)}
        sx={{ width: 200, height: 50, backgroundColor: 'gray'}}
        renderInput={(params) => <TextField {...params} label="Status" />}
      />
      <label>PreferredPaymentMethod: </label>
      <Autocomplete
        disablePortal
        options={optionsPayment}
        value={preferredPaymentMethod}
        onChange={(e, newValue) => setPreferredPaymentMethod(newValue)}
        sx={{ width: 200, height: 50,backgroundColor: 'gray'}}
        renderInput={(params) => <TextField {...params} label="Payment" />}
      />

      <button type="submit">Add Client</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ClientForm;
