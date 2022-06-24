import "./Nav.css";
import React from "react";
export default function Nav() {
  return (
    <div className="navbar">
          <h1 className="logo">E-TASKS</h1>
      <a href='http://localhost:3000'><button className="logout" >
        Logout
      </button></a>
    </div>
  );
}
