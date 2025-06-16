import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalEdit(props) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { show, handleClose, handleSave, handleUpdateTable, data } = props;
  const handleEditUser = async () => {
    const res = await postCreateUser(name, job);
    if (res && res.id) {
      console.log("Response from API:", res);

      setName(""); // Reset name input
      setJob(""); // Reset job input
      handleClose(); // Close the modal
      toast.success("User added successfully!");
      handleUpdateTable({ first_name: name, id: res.id }); // Call the parent function to update the table
    } else {
      console.error("Error adding user:", res);
      toast.error("Failed to add user. Please try again.");
    }
  };
  useEffect(() => {
    if (show && data) {
      // If the modal is shown and data is available, set the name and job
      setName(data.first_name || ""); // Use empty string if first_name is undefined
      setJob(data.last_name || ""); // Use empty string if last_name is undefined
    }
  }, [data]);
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        >
          <Modal.Title className="text-gray-900 dark:text-gray-100">
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300">
          <Form onSubmit={handleEditUser}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)} // Prevent modal from closing on input click
                placeholder="Enter name"
                required
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="job">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                name="job"
                value={job}
                onChange={(event) => setJob(event.target.value)}
                placeholder="Enter job"
                required
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="bg-gray-400 dark:bg-gray-600 text-white hover:bg-gray-500 dark:hover:bg-gray-500"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleEditUser}
            className="bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0]"
          >
            Confirm Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;
