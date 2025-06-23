import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirm = ({ show, handleClose, handleDeleteUserFormModal, dataDelete }) => {
  const handleConfirmDelete = () => {
    handleDeleteUserFormModal(dataDelete.id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete user <strong>{dataDelete.first_name} {dataDelete.last_name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;