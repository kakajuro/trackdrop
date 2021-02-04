import React, { useState } from "react";
import { Link } from "react-router-dom";

import Spacer from "react-spacer";

import Validation from "../components/validation";

import "../styles/Register.scss";

export default function Register({ setAuth }) {

  document.addEventListener('invalid', () => {
    return (e) => {
      e.preventDefault();
      setInvalidForm(true);
      setFormRes("Invalid entries");
    }
  });

  const [invalidForm, setInvalidForm] = useState(false);
  const [formRes, setFormRes] = useState("");
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        setAuth(false);
        setInvalidForm(true);
        setFormRes(parseRes); 
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container" autoComplete="off">
      <Spacer height="200px" />
      <h1>Register</h1>
      <form className="form" onSubmit={onSubmitForm}>
        <input
          className="input"
          autoComplete="off"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onChange(e)}
        />
        <Spacer height="15px" />
        <input
          className="input"
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => onChange(e)}
        />
        <Spacer height="15px" />
        <input
          className="input"
          type="text"
          name="name"
          value={name}
          placeholder="Username"
          onChange={(e) => onChange(e)}
        />
        <Spacer height="12.5px" />
        { invalidForm
          ? <Validation text={formRes} />
          : ""
        }
        <Spacer height="12.5px" />
        <button className="register-button">Join</button>
      </form>
      <p className="outside-text">Already have an account? <Link className="link"to="/login">Login</Link></p>
    </div>
  );
};
