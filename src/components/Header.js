import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import logoApp from "../assets/images/logo192.png"; // Import logo từ assets
import { toast } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function Header() {
  const { handleLogout, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [hideHeader, setHideHeader] = useState(false);
  const handleLogoutClick = () => {
    handleLogout();
    toast.success("You have been logged out successfully!");
    navigate("/");
    // Reload sau 1 giây để đảm bảo state được cập nhật
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  console.log(user);

  useEffect(() => {
    if (window.location.pathname === "/login") {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }
  }, []);
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
