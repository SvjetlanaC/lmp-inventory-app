import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { IRegisterUser } from "../../models/IRegisterUser";
import { Link, useNavigate } from "react-router-dom";
import { initialLoginUser } from "../../models/ILoginUser";
import { UserContext } from "../../contexts/UserContext";
import { ActionType } from "../../actions/actions";

function Login() {
  const [user, setUser] = React.useState(initialLoginUser);

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  function handleForm(event: any) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  function login(event: any) {
    event.preventDefault();
    const users: IRegisterUser[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    if (
      users.length > 0 &&
      users.filter(
        (u) => u.username === user.username && u.password === user.password
      ).length
    ) {
      toast.success("You successfully logged in!");
      userContext?.dispatch({
        type: ActionType.SET_USER,
        payload: {
          username: user.username,
          password: user.password,
          isAuthenticated: true,
        },
      });
      navigate("/inventory");
    } else {
      toast.error("Access denied!");
    }
  }

  return (
    <div className="vertical-center">
      <div className="container">
        <img src="10469240.png" alt="Inventory App" />
        <h1>Login</h1>
        <form onSubmit={(event) => login(event)}>
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
            />
          </div>

          <button className="btn btn-outline-light button">Log In</button>
          <Link to="/register" className="link">
            Don't have an account? Register
          </Link>
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={true}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
