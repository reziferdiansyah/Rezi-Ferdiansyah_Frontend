import React, { useEffect, useState } from "react";
import request from "actions/connect";
import "./Navbar.css";
import history from "../history";

function logout() {
  localStorage.clear();
  history.push("/login");
}

export default function Navbar() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    request.get("/user/get").then((res) => {
      setUsername(res.data.data.username);
      localStorage.setItem("username", res.data.data.username);
    });
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button className="navbar-brand">LOGO</button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="row">
          <div className="mb-1">
            <label>{username}</label>
          </div>
          <div className="mb-1">
            <label>Product designer</label>
          </div>
        </div>
        <a href="/login">
          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </a>
      </div>
    </nav>
  );
}
