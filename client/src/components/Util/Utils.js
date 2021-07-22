import { Alert, Spinner } from "react-bootstrap";

export const AlertBox = ({ message, variant }) => {
  return (
    <div className="w-75 m-auto text-center">
      <Alert className="mt-3" style={{ fontSize: "1.2rem" }} variant={variant}>
        {message}
      </Alert>
    </div>
  );
};

export const CircularProgress = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Spinner
        className="text-white"
        animation="border"
        role="status"
        size="lg"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};
