import React from "react";
import "../login/login.css";
import { ToastContainer, toast } from "react-toastify";
import { IRegisterUser, initialRegisterUser } from "../../models/IRegisterUser";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = React.useState(initialRegisterUser);

  function handleForm(event: any) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  function register(event: any) {
    event.preventDefault();
    const users: IRegisterUser[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    if (users.filter((u) => u.username === user.username).length) {
      toast.error("Username already exists!");
      return;
    }

    users.push({
      username: user.username,
      password: user.password,
      email: user.email,
    });
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("You are successfully registered!");
  }

  return (
    <div>
      <div className="vertical-center">
        <div className="container">
          <img src="10469240.png" alt="Inventory App" />
          <h1>Registration</h1>
          <form onSubmit={(event) => register(event)}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={user.username}
                placeholder="Enter Username"
                onChange={(event) => handleForm(event)}
                className="form-control"
                required
                minLength={5}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={user.password}
                placeholder="Enter Password"
                onChange={(event) => handleForm(event)}
                className="form-control"
                required
                minLength={7}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                placeholder="Enter Email"
                onChange={(event) => handleForm(event)}
                className="form-control"
                required
              />
            </div>

            <button className="btn btn-outline-light button">Register</button>
            <Link to="/" className="link">
              Already have an account? Login
            </Link>
            <ToastContainer
              position="bottom-right"
              autoClose={2500}
              hideProgressBar={true}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
