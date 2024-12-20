import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link } from "react-router-dom";
import { register } from "../../services/authService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterLogo from "./register.svg";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (name.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        usernameLength: ["Vartotojo vardas per trumpas. (bent 6 simboliai)"],
      }));
    }

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailFormat: ["Netinkamas el. pašto formatas."],
      }));
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordLength: ["Slaptažodis per trumpas. (bent 6 simboliai)"],
      }));
    }

    if (Object.keys(errors).length > 0) {
      console.log("errors");
      return;
    }

    try {
      await register(name, email, password);
      navigate('/login?registration=success');
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <NavBar />

      <form className="form-signin" onSubmit={handleSubmit}>
        <center>
          <img
            className="mb-4"
            src={RegisterLogo}
            alt=""
            width="72"
            height="72"
          />
        </center>
        <h1 className="h3 mb-3 font-weight-normal">Registracija</h1>

        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger" role="alert">
            {Object.values(errors).map((errorArray, index) =>
              errorArray.map((error, idx) => (
                <p key={`${index}-${idx}`}>{error}</p>
              ))
            )}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">
            Vartotojo vardas
          </label>
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="username"
            placeholder="Vartotojo vardas"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            El. pašto adresas
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="El. pašto adresas"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Slaptažodis
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Slaptažodis"
          />
        </div>

        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
          Registruotis
        </button>
        <div className="separator mt-2">arba</div>

        <Link to="/login">
          <button
            className="btn btn-lg btn-secondary btn-block mt-2"
            type="button"
          >
            Prisijungti
          </button>
        </Link>
      </form>

      <Footer />
    </>
  );
}

export default RegisterPage;
