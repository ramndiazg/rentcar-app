"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, FormLabel } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3546/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login fail");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      setError("Error in logging. Please verify your credentials.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <form onSubmit={handleSubmit}>
      <FormControl sx={{ alignItems: 'center' }}>
      <FormLabel sx={{ width: 500, height: 50, color: "white" }}>Login</FormLabel>
      <TextField
          label="Email"
          type="email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          sx={{ width: 500, height: 50, backgroundColor: "#bbdefb", borderRadius: 3, marginY: 0.5, marginX: 1}}
        />
          <TextField
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          sx={{ width: 500, height: 50, backgroundColor: "#bbdefb", borderRadius: 3, marginY: 0.5, marginX: 1 }}
        />
        <Button
          type="submit"
          sx={{ width: 200, height: 50, backgroundColor: "#01579b", color: "white", borderRadius: 6, marginY: 0.5, marginX: 1 }}
        >
          Login
        </Button>
        {error && <div className="error">{error}</div>}
        </FormControl>
      </form>
    </div>
  );
}
