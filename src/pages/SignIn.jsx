import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = (e) => {
    const storedUser = JSON.parse(localStorage.getItem("credentials"));
    e.preventDefault();

    // Validate
    if (
      storedUser.email !== credentials.email ||
      storedUser.password !== credentials.password
    ) {
      return Swal.fire({
        text: "Incorrect email or password",
        icon: "error",
      });
    }
    localStorage.setItem("loggedIn", "true");
    navigate("/")

  };

  return (
    <div className="bg-[#82a6e921] p-11 flex justify-center min-w-screen min-h-screen">
      <div className="bg-white p-5 lg:w-[60%] gap-5 lg:px-19 flex flex-col justify-evenly">
      <h1 className="text-5xl flex justify-center font-bold">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-2xl">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              value={credentials.email}
              onChange={handleChange}
              className="border-b-2"
              type="email"
              id="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              value={credentials.password}
              onChange={handleChange}
              className="border-b-2"
              type="password"
              id="password"
              required
            />
          </div>

          <div className="flex justify-center m-5">
          <button className="py-2 px-5 rounded-b-md bg-blue-950 text-white" type="submit">
            Sign In
          </button>
          </div>
          <div>
            Don't have an account? <span className="text-2xl text-blue-800"><Link to="/signUp">Create one here</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
