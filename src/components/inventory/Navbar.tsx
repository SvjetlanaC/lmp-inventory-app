import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ActionType } from "../../actions/actions";

const Navbar = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  function logout() {
    userContext?.dispatch({ type: ActionType.SET_AUTH, payload: false });
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">Inventory App</span>
          <div className="d-flex">
            <span className="navbar-text text-nowrap p-3">
              Welcome {userContext?.user.username}!
            </span>
            <button className="btn btn-outline-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
