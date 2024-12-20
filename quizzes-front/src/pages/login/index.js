import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";

import "./signin.css";
import LoginImage from "./login.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { login } from "../../services/authService";

function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("registration") === "success") {
      setShowSuccessMessage(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(user, password);
      navigate("/home", { replace: true });
    } catch (error) {
      setError("Klaidingi prisijungimo duomenys!");
      console.log("Klaida");
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />

      <div className="container">
        <form className="form-signin" onSubmit={handleSubmit}>
          <center>
            <img
              className="mb-4"
              src={LoginImage}
              alt=""
              width="72"
              height="72"
            />
          </center>
          {showSuccessMessage && (
            <div className="alert alert-success" role="alert">
              Registracija sėkminga! Dabar galite prisijungti.
            </div>
          )}
          {error ? (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <></>
          )}
          <h1 className="h3 mb-3 font-weight-normal">Prašome prisijungti</h1>
          <label for="inputEmail" className="sr-only">
            Vartotojo vardas
          </label>
          <input
            type="text"
            id="inputEmail"
            className="form-control"
            placeholder="Vartotojo vardas"
            required=""
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autofocus=""
          />
          <label for="inputPassword" className="sr-only">
            Slaptažodis
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Slaptažodis"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required=""
          />

          <button
            className="btn btn-lg btn-primary btn-block mt-3"
            type="submit"
          >
            Prisijungti
          </button>
          <div className="separator mt-2">arba</div>

          <Link to="/register">
            <button className="btn btn-lg btn-secondary btn-block mt-2">
              Registruotis
            </button>
          </Link>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default LoginPage;
