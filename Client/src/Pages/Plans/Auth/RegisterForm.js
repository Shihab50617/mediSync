import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/create",
        formData
      );

     if (response.data.success) {
  window.alert(response.data.message);
  navigate("/login");
} else {
  window.alert(response.data.error || "Registration failed");
}


    }  catch (error) {
  if (error.response) {
    console.error("Error creating user:", error.response.data);
    console.error("Status code:", error.response.status);
    window.alert(`Error during registration: ${error.response.data.error || error.response.data.message}`);
  } else {
    console.error("Error creating user:", error.message);
    window.alert("Error during registration.");
  }
}

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h1>

        <form className="space-y-3">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
