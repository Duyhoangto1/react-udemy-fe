import { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSync } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { loginUserRedux } from "../redux/actions/UserAction";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Kiểm tra xem nút Login có nên active không
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const account = useSelector((state) => state.user.account);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginUserRedux(email, password));
    } catch (error) {
      console.error("Error:", error.message);
      setError("An error occurred. Please try again.");
    }
  };
  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  useEffect(() => {
    if (account && account?.auth === true) {
      navigate("/");
    }
  }, [account]);

  return (
    <Container
      className="justify-content-center align-items-center min-vh-100 login-container"
      style={{
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <Row className="rol-container">
        <Col md={8} lg={6} xl={5} className="mx-auto">
          <Card className="p-5 w-100 shadow-sm rounded-4">
            <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="fw-medium">
                  Email or username (eve.holt@reqres.in)
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-3 p-2"
                  style={{ borderColor: "#ced4da" }}
                />
              </Form.Group>

              <Form.Group
                className="mb-4 position-relative"
                controlId="formBasicPassword"
              >
                <Form.Label className="fw-medium">Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-3 p-2 pe-4"
                  style={{ borderColor: "#ced4da" }}
                  onKeyDown={(e) => {
                    handlePressEnter(e);
                  }}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={`w-100 mb-3 rounded-3 py-2 ${
                  isFormValid ? "btn-active" : ""
                }`}
                style={{
                  transition: "all 0.3s",
                  fontSize: "1.1rem",
                  opacity: isFormValid ? 1 : 0.6,
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
                onMouseOver={(e) => {
                  if (isFormValid && !isLoading)
                    e.currentTarget.style.backgroundColor = "#0056b3";
                }}
                onMouseOut={(e) => {
                  if (isFormValid && !isLoading)
                    e.currentTarget.style.backgroundColor = "";
                }}
                disabled={!isFormValid || isLoading} // Vô hiệu hóa khi không hợp lệ hoặc loading
              >
                {isLoading ? <FontAwesomeIcon icon={faSync} spin /> : "Login"}
              </Button>
              <p className="text-center mb-0">
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="text-primary fw-bold text-decoration-underline"
                >
                  Register here
                </a>
              </p>
              <p className="text-center mb-0">
                <a href="/" className="fw-bold text-decoration-none">
                  <i className="fa-solid fa-angle-left"></i> Back to Home
                </a>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// CSS inline hoặc thêm vào file global (ví dụ: App.scss)
const styles = `
  .btn-active {
    background-color: #007bff !important;
    border-color: #0056b3 !important;
  }
  .btn-active:hover {
    background-color: #0056b3 !important;
    border-color: #004085 !important;
  }
  .cursor-pointer {
    cursor: pointer;
  }
`;

export default Login;
