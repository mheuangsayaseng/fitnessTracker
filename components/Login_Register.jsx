import React, { useState } from "react";
import { registerUser, login } from "../api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login_Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken, user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await registerUser(username, password);
      console.log("User registered", result);
      setToken(result.data.token);
      localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username Here"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="text"
          name="password"
          placeholder="Enter Password Here"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register New User</button>
      </form>
    </div>
  );
}

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const result = await login(username, password);
    console.log("Login", result);
    setToken(result.data.token);
    localStorage.setItem("token", result.data.token);
  } catch (error) {
    console.log("Error", error);
  }
}

return (
  <div>
    <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        placeholder="Enter Username Here"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="text"
        name="password"
        placeholder="Enter Password Here"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Submit</button>
    </form>
  </div>
);

// const registerUser = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/users/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           username: "",
//           password: "",
//         },
//       }),
//     });
//     const result = await response.json();

//     console.log(result);
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// };

// const login = async () => {

//     try {
//       const response = await fetch(`${BASE_URL}/users/login`, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             username: '',
//             password: ''
//         })
//       });
//       const result = await response.json();
//       console.log(result);
//       return result
//     } catch (err) {
//       console.error(err);
//     }
// }
