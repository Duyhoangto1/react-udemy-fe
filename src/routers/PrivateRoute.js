import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user.account);
  if (user && !user.auth) {
    return (
      <>
        You don't have permission to access this page
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>You don't have permission to access this page</p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
