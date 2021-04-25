import React, { useState } from "react";
import { Link } from "react-router-dom";

import Spacer from "react-spacer";

import Validation from "../components/validation";

import "../styles/Login.scss";

export default function Login({ setAuth }) {
  document.addEventListener("invalid", () => {
    return (e) => {
      e.preventDefault();
      setInvalidForm(true);
      setFormRes("Invalid entries");
    };
  });

  const [invalidForm, setInvalidForm] = useState(false);
  const [formRes, setFormRes] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
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
    <div className='container' autoComplete='off'>
      <Spacer height='200px' />
      <h1>Login</h1>
      <form className='form' onSubmit={onSubmitForm}>
        <input
          className='input email'
          autoComplete='off'
          type='email'
          name='email'
          value={email}
          placeholder='Email...'
          onChange={(e) => onChange(e)}
        />
        <Spacer height='15px' />
        <input
          className='input password'
          type='password'
          name='password'
          value={password}
          placeholder='Password...'
          onChange={(e) => onChange(e)}
        />
        <Spacer height='10px' />
        {invalidForm ? <Validation text={formRes} /> : ""}
        <Spacer height='15px' />
        <button className='register-button'>Go</button>
      </form>
      <Spacer height='10px' />
      <p className='outside-text'>
        Don't have an account?{" "}
        <Link className='link' to='/register'>
          Create one
        </Link>
      </p>
    </div>
  );
}
