import React, { useState, useEffect } from "react";

export default function Feed({ setAuth }) {
  const [name, setName] = useState("");
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.username);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    //toast.success("Successfully logged out");
  };
  
  return (
    <div>
      <h1>Feed {name}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </div>
  );
};


