import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalEdit(props) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { show, handleClose, handleEditUserFormModal, data } = props;
  const handleEditUser = async () => {
    const res = await putUpdateUser(data.id, name, job); // thêm data.id
    console.log("Response from API123:", res.updatedAt);

    if (res && res.updatedAt) {
      setName("");
      setJob("");
      handleClose();
      toast.success("User updated successfully!");

      handleEditUserFormModal({ id: data.id, first_name: name }); // Update user in table
    } else {
      console.error("Error updating user:", res);
      toast.error("Failed to update user. Please try again.");
    }
  };

  useEffect(() => {
    if (show && data) {
      // If the modal is shown and data is available, set the name and job
      setName(data.first_name || ""); // Use empty string if first_name is undefined
      setJob(data.last_name || ""); // Use empty string if job is undefined
    }
  }, [data]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
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
