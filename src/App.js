import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import AppRoute from "./routers/AppRoute";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/UserAction";
import { useEffect } from "react";

function App() {
  const datauserRedux = useSelector((state) => state.user.account);
  console.log("check redux", datauserRedux);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, []);
  return (
    <>
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
    </>
  );
}

export default App;
