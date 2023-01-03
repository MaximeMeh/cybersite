import { React, useState } from "react";
import Header from "../header/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "", // required
    password: "", // required
  });
  const [error, setError] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    
    axios
      .post(process.env.REACT_APP_URL_USERS, { ...formData })
      .then((res) => {
        console.log(res.data.role);
        localStorage.setItem("role", res.data.role);
        
        // Redirect to the appropriate route depending on the user role
        if (localStorage.getItem("role") === "User") {
          navigate("/modeles");
        }
        if (localStorage.getItem("role") === "rd") {
          navigate("/ingredients");
        }
        if (localStorage.getItem("role") === "pro") {
          navigate("/procedes");
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("role");
        setError("Email et/ou mot de passe incorrect(s)");
      });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Header />
      <div className="login-wrapper">
        <h2>Connexion</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <TextField
              size="small"
              label="Email"
              type="text"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <div>
            <TextField
              size="small"
              label="Mot de passe"
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <div>
            <Button variant="contained" type="submit">
              Connexion
            </Button>
          </div>
          {error ? <h5 style={{ color: "red" }}>{error}</h5> : null}
        </form>
      </div>
    </>
  );
}

export default LoginPage;
