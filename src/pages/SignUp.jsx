import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (credentials.username.length < 3 || credentials.username.length > 50) {
      return Swal.fire({
        text: "Username must be between 3 and 50 characters",
        icon: "warning",
      });
    } else if (credentials.password.length < 8) {
      return Swal.fire({
        text: "Password must have at least 8 characters",
        icon: "warning",
      });
    } else if (credentials.password !== credentials.confirmPass) {
      return Swal.fire({
        text: "Passwords must match",
        icon: "warning",
      });
    }

    localStorage.setItem("credentials", JSON.stringify(credentials));
    navigate("/signIn");
  };

  return (
    <div className="bg-[#82a6e921] p-11 flex justify-center min-w-screen min-h-screen">
      <div className="bg-white p-5 lg:w-[60%] gap-5 lg:px-19 flex flex-col justify-evenly">
        <h1 className="text-4xl flex justify-center font-bold">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-2xl">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              value={credentials.username}
              onChange={handleChange}
              className="border-b-2"
              type="text"
              id="username"
              required
            />
          </div>
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
          <div className="flex flex-col">
            <label htmlFor="ConfirmPass">Confirm Password</label>
            <input
              value={credentials.confirmPass}
              onChange={handleChange}
              className="border-b-2"
              type="password"
              id="confirmPass"
              required
            />
          </div>
          <div className="flex justify-center mt-2">
          <button className="py-2 px-5 rounded-b-md bg-blue-950 text-white" type="submit">
            Sign Up
          </button>
          </div>
          
          <div>
            Already have an account? <span className="text-2xl text-blue-800"><Link to="/signIn">Sign in here</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
