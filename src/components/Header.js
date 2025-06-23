import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import logoApp from "../assets/images/logo192.png"; // Import logo từ assets
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUserRedux } from "../redux/actions/UserAction";
function Header() {
  const user = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logoutUserRedux());
  };
  useEffect(() => {
    if (user && user.auth === false && window.location.pathname !== "/login") {
      navigate("/");
      toast.success("You have been logged out successfully!");
    }
  }, [user]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logoApp}
            alt="logo"
            width="30"
            height="30"
            className="me-2"
          />{" "}
          <span>DUYHOANGTO</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth === true) || window.location.pathname === "/" ? (
            <Nav className="me-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Manage Users
              </NavLink>
            </Nav>
          ) : (
            <></>
          )}
          {/* Di chuyển NavDropdown sang tay phải */}
          <Nav className="ms-auto">
            {user && user.email && user.auth === true ? (
              <span className="nav-link"> Welcome {user.email} </span>
            ) : (
              <span className="nav-link"> Welcome Guest </span>
            )}
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              {user && user.auth === false ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "dropdown-item active" : "dropdown-item"
                  }
                >
                  Login
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                    onClick={handleLogoutClick}
                  >
                    Log Out
                  </NavLink>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
