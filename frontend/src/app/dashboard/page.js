"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Appbar from "../components/Appbar";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const router = useRouter();

  const goToPage = (path) => {
    router.push(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
        return;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:3546/api/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <Appbar />
    <Container>
      <Box sx={{ textAlign: "center", marginY: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        {/* <Typography variant="subtitle1" color="textSecondary">
          Welcome!
        </Typography> */}
      </Box>

      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Card variant="outlined" sx={{ maxWidth: 500, width: "100%" }}>
          <CardContent>
            <Typography variant="h6">Vehicle</Typography>
            <Typography variant="body2" color="textSecondary">
              Go to the vehicle page to manage vehicle information.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => goToPage("/vehicle")}
              sx={{ marginTop: 2 }}
            >
              Go to Vehicle
            </Button>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ maxWidth: 500, width: "100%" }}>
          <CardContent>
            <Typography variant="h6">Client</Typography>
            <Typography variant="body2" color="textSecondary">
              Go to the client page to manage client details.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => goToPage("/client")}
              sx={{ marginTop: 2 }}
            >
              Go to Client
            </Button>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ maxWidth: 500, width: "100%" }}>
          <CardContent>
            <Typography variant="h6">User</Typography>
            <Typography variant="body2" color="textSecondary">
              Go to the user page to manage user settings.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => goToPage("/user")}
              sx={{ marginTop: 2 }}
            >
              Go to User
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Container>
    </div>
  );
}
