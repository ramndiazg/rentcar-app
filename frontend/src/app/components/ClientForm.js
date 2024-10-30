import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";

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
      <FormControl>
        <FormLabel>Add New Client</FormLabel>
        <TextField
          label="First Name"
          type="text"
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Last Name"
          type="text"
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Phone"
          type="text"
          variant="outlined"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Email"
          type="text"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <TextField
          label="Address"
          type="text"
          variant="outlined"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
        />
        <Autocomplete
          disablePortal
          options={optionsStatus}
          value={membershipStatus}
          onChange={(e, newValue) => setMembershipStatus(newValue)}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
          renderInput={(params) => (
            <TextField {...params} label="MembershipStatus" />
          )}
        />
        <Autocomplete
          disablePortal
          options={optionsPayment}
          value={preferredPaymentMethod}
          onChange={(e, newValue) => setPreferredPaymentMethod(newValue)}
          sx={{ width: 500, height: 50, backgroundColor: "gray" }}
          renderInput={(params) => (
            <TextField {...params} label="PreferredPaymentMethod" />
          )}
        />

        <Button
          type="submit"
          sx={{ width: 500, height: 50, backgroundColor: "blue", color: "red" }}
        >
          Add Client
        </Button>

        {error && <div className="error">{error}</div>}
      </FormControl>
    </form>
  );
};

export default ClientForm;
