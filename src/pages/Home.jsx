import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";

const Home = () => {
  const username =
    JSON.parse(localStorage.getItem("credentials") || "{}").username || "";
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    weight: 0,
    height: 0,
    BMI: 0,
    category: "",
    idealWeight: 0,
    bodyShape: "",
  });

  if (!isLoggedIn) {
    navigate("/signIn");
    window.location.href = "/signIn";
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const calcBMI = (w, h) => {
    return w / (h / 100) ** 2;
  };

  const classifyBMI = (bmi) => {
    if (bmi < 18.5) {
      setUserData({
        ...userData,
        category: "Underweight",
        bodyShape: "/imgs/underweight.png",
      });
    }

    if (18.5 < bmi && bmi < 24.9) {
      setUserData({
        ...userData,
        category: "Normal weight",
        bodyShape: "/imgs/normal.png",
      });
    }
    if (25.5 < bmi && bmi < 29.9) {
      setUserData({
        ...userData,
        category: "overweight",
        bodyShape: "/imgs/overweight.png",
      });
    }
    if (bmi > 30.0) {
      setUserData({
        ...userData,
        category: "Obese",
        bodyShape: "/imgs/obese.png",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      BMI: calcBMI(userData.weight, userData.height),
      idealWeight: 22 * (userData.height / 100) ** 2,
    });
    classifyBMI(userData.BMI);
  };

  const logOut = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/signIn";
  };

  return (
    <div className=" min-w-screen min-h-screen">
      <nav className="flex bg-[#00215d9a] text-white text-2xl font-bold items-center justify-between p-2">
        <div>Hello, {username}</div>
        <button className="border-1 border-white py-2 px-3" onClick={logOut}>
          Log Out
        </button>
      </nav>

      <div className="flex flex-col items-center p-11 gap-14">
        <h1 className="text-4xl font-bold">BMI Calculator</h1>
        <form className="bg-[#82a6e921] p-6" onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div>
              <label className="text-xl font-bold mx-3" htmlFor="weight">
                Enter Your Weight (kg):
              </label>
              <input
                onChange={handleChange}
                className="border-b-2"
                type="number"
                id="weight"
                required
              />
            </div>

            <div>
              <label className="text-xl font-bold mx-3" htmlFor="height">
                Enter Your Height (cm):
              </label>
              <input
                onChange={handleChange}
                className="border-b-2"
                type="number"
                id="height"
                required
              />
            </div>
            <button
              className="bg-[#00215d9a] text-white font-bold px-4 py-2"
              type="submit"
            >
              Calculate
            </button>
          </div>
        </form>
        <div className="p-5 gap-3 flex flex-col bg-[#82a6e921] min-w-[70%] text-2xl lg:text-4xl">
          <div className="">
            <span className="font-bold m-4">Your BMI is:</span>
            {userData.BMI.toFixed(2)}
          </div>
          <div className="">
            <span className="font-bold m-4">Your Ideal Weight is:</span>
            {userData.idealWeight.toFixed()} Kg.
          </div>
          <div className="">
            <span className="font-bold m-4">Your BMI Category is:</span>
            {userData.category}
          </div>
          <div className="flex justify-center">
            <img src={userData.bodyShape} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
