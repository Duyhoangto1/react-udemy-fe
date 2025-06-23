import { useEffect, useState, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import _, { debounce } from "lodash"; 
import ModalConfirm from "./ModalConfirm";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

function TableUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [dataExport, setDataExport] = useState([]);

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const getUsers = async () => {
    try {
      const response = await fetchAllUsers(currentPage);
      if (response) {
        let sortedUsers = [...response.data];
        if (sortField && sortBy) {
          sortedUsers = _.orderBy(sortedUsers, [sortField], [sortBy.toLowerCase()]);
        }
        setUsers(sortedUsers);
        setTotalPages(response.total_pages);
        setTotalUsers(response.total);
      } else {
        setUsers([]);
        setTotalPages(1);
        setTotalUsers(0);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setUsers([]);
      setTotalPages(1);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handleAddNewUser = () => {
    setIsShowModalAddNew(true);
  };

  const handleUpdateTable = (user) => {
    if (user.id) {
      setUsers((prevUsers) => [...prevUsers, user]);
    } else {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user));
    }
  };

  const handleEditUser = (user) => {
    setIsShowModalEdit(true);
    setData(user);
  };

  const handleEditUserFormModal = (user) => {
    let cloneList = _.cloneDeep(users);
    let index = cloneList.findIndex((item) => item.id === user.id);
    if (index !== -1) {
      cloneList[index].first_name = user.first_name;
      setUsers(cloneList);
    }
  };

  const handleDeleteUser = (user) => {
    setIsShowModalConfirm(true);
    setDataDelete(user);
  };

  const handleDeleteUserFormModal = (userId) => {
    let cloneList = _.cloneDeep(users);
    cloneList = cloneList.filter((item) => item.id !== userId);
    setUsers(cloneList);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    const sortedUsers = _.orderBy(users, [sortField], [sortBy.toLowerCase()]);
    setUsers(sortedUsers);
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (!searchTerm) {
        getUsers();
        return;
      }
      const filteredUsers = users.filter((user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(filteredUsers);
    }, 300),
    [users]
  );

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const getDataExport = async (event, done) => {
    let result = [];
    if (users.length > 0) {
      result.push(["ID", "Email", "First Name", "Last Name"]);
      users.map((user) => {
        let arr = [];
        arr[0] = user.id;
        arr[1] = user.email;
        arr[2] = user.first_name;
        arr[3] = user.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async (e) => {
        const csv = e.target.result;
        const parsedCSV = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        });
        const data = parsedCSV.data;
        if (data.length > 0) {
          const newUsers = data.map((row) => ({
            id: row.ID,
            email: row.email,
            first_name: row.first_name,
            last_name: row.last_name,
          }));
          setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        }
      };
    }
  };

  return (
    <div>
      <div className="my-3 add-new flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          List Users
        </span>
        <div>
          <label
            htmlFor="file-upload"
            className="btn btn-warning px-4 py-2 bg-gray-500 text-black rounded-lg"
          >
            <input
              type="file"
              id="file-upload"
              hidden
              onChange={handleImportCSV}
            />
            <i className="fa fa-file-excel"></i> Export to Excel
          </label>

          <CSVLink
            data={dataExport}
            asyncOnClick={true}
            filename="users.csv"
            target="_blank"
            onClick={getDataExport}
          >
            <button className="btn btn-primmary px-4 py-2 bg-gray-500 text-black rounded-lg">
              <i className="fa fa-download "></i> Download CSV
            </button>
          </CSVLink>
          <button
            className="btn btn-success px-4 py-2 bg-gray-500 text-black rounded-lg"
            onClick={handleAddNewUser}
          >
            <i className="fa fa-plus"></i> Add New user
          </button>
        </div>
      </div>
      <div className="text-center mb-3">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sortable">
                <span>ID</span>
                <span className="sort-icon">
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  />
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  />
                </span>
              </div>
            </th>
            <th>
              <div className="sortable">
                <span>First Name</span>
                <span className="sort-icon">
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "first_name")}
                  />
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  />
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1 + (currentPage - 1) * 6}</td>
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
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No users available or failed to load.</td>
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
        handleEditUserFormModal={handleEditUserFormModal}
        handleShow={() => setIsShowModalEdit(true)}
      />
      <ModalConfirm
        show={isShowModalConfirm}
        handleClose={() => setIsShowModalConfirm(false)}
        handleUpdateTable={handleUpdateTable}
        handleDeleteUserFormModal={handleDeleteUserFormModal}
        dataDelete={dataDelete}
      />
    </div>
  );
}

export default TableUsers;