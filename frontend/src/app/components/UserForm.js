import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

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

    const user = {
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
    };

    const response = await fetch("http://localhost:3546/api/user", {
      method: "POST",
      body: JSON.stringify(user),
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
      setPassword("");
      setRole("");
      setError(null);
      console.log("New user added", json);
    }
  };

  return (
    <form className="createUser" onSubmit={handleSubmit}>
      <p>Add New User</p>
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
      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label>Role: </label>
      <input
        type="text"
        onChange={(e) => setRole(e.target.value)}
        value={role}
      />
      <button type="submit">Add User</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UserForm;
