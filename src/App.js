import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";

import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import AppRoute from "./routers/AppRoute";

function App() {
  const { user, handleLogin } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleLogin(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, []);
  return (
    <Router>
      <div className="app-container min-h-screen bg-gradient-to-br from-navy-900 to-navy-700">
        <Header />
        <Container className="py-6">
          <AppRoute />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
