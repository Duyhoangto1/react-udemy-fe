import { useContext } from "react";

import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);
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
