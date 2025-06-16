import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postDeleteUser } from "../services/UserService"; // Assuming this exists
import { toast } from "react-toastify";

function ModalConfirm(props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { show, handleClose, handleDeleteUserFormModal, dataDelete } = props;
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await postDeleteUser(dataDelete.id); // Call delete service with userId
      console.log("Response from API:", res);
      if (res && +res.statusCode === 204) {
        toast.success("User deleted successfully!");
        handleClose(); // Close the modal
        handleDeleteUserFormModal(dataDelete); // Update table with deleted user ID
      } else {
        console.error("Error deleting user:", res);
        toast.error("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    } finally {
      setIsDeleting(false);
    }
  };

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
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300">
          <h3>
            {" "}
            Are you sure you want to delete this user ?
            <br />
          </h3>
          email: {dataDelete.email}
        </Modal.Body>
        <Modal.Footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="bg-gray-400 dark:bg-gray-600 text-white hover:bg-gray-500 dark:hover:bg-gray-500"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            className="bg-[#F76F8E] dark:bg-[#F76F8E] text-white hover:bg-[#d65a7a] dark:hover:bg-[#d65a7a]"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="mr-2">Deleting...</span>
                <span className="animate-spin inline-block w-4 h-4 border-t-2 border-b-2 border-white rounded-full"></span>
              </>
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
