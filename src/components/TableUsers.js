import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";

import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
function TableUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const getUsers = async () => {
    try {
      const response = await fetchAllUsers(currentPage);
      console.log("check response", response);
      if (response) {
        setUsers(response.data); // Set to the data array directly
        setTotalPages(response.total_pages); // Set total pages from response
        setTotalUsers(response.total);
        console.log("Total ", response.total);
      } else {
        setUsers([]);
        setTotalPages(1);
        setTotalUsers(0);
      }
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.message,
        error.response?.data
      );
      if (error.response?.status === 401) {
        console.log("Unauthorized: Check API key");
      }
      setUsers([]);
      setTotalPages(1);
    }
  };
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // ReactPaginate uses zero-based index
    setCurrentPage(selectedPage);
    getUsers();
  };
  const handleAddNewUser = () => {
    setIsShowModalAddNew(true); // Open modal when Add New is clicked
    console.log("Add New User button clicked");
  };

  const handleUpdateTable = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]); // Add new user to the lis
    //getUsers(); // Refresh the user list after adding a new user
  };

  const handleEditUser = (user) => {
    setIsShowModalEdit(true); // Open edit modal when Edit is clicked
    console.log("Edit User button clicked for user:", user);
    setData(user); // Set the user data to be edited
    // You can also pass the user data to the modal if needed
  };
  return (
    <div>
      <div className="my-3 add-new flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          List Users
        </span>
        <button
          className="btn btn-success px-4 py-2 bg-gray-500  text-black rounded-lg"
          onClick={handleAddNewUser}
        >
          Add New
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  @
                  {user.username ||
                    (user.email ? user.email.split("@")[0] : "unknown")}
                </td>
                <td>
                  <button
                    className="btn btn-primary mx-3"
                    onClick={
                      () => handleEditUser(user) // Open edit modal when Edit is clicked
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger "
                    onClick={() => console.log("Delete user", user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No users available or failed to load.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        nextClassName="page-item"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setIsShowModalAddNew(false)}
        handleUpdateTable={handleUpdateTable}
        handleShow={() => setIsShowModalAddNew(true)}
      />
      <ModalEdit
        show={isShowModalEdit}
        data={data}
        handleClose={() => setIsShowModalEdit(false)}
        handleUpdateTable={handleUpdateTable}
        handleShow={() => setIsShowModalEdit(true)}
      />
    </div>
  );
}

export default TableUsers;
