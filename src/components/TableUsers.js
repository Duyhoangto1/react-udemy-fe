import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../services/UserService';
import Pagination from 'react-bootstrap/Pagination';
import ReactPaginate from 'react-paginate';
function TableUsers() {
  const [users, setUsers] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const getUsers = async () => {
    try {
      const response = await fetchAllUsers(currentPage);
      console.log('check response', response);
      if (response ) {
        setUsers(response.data); // Set to the data array directly
        setTotalPages(response.total_pages); // Set total pages from response
          setTotalUsers(response.total);
        console.log('Total ', response.total);
      } else {
        setUsers([]);
        setTotalPages(1);
        setTotalUsers(0);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message, error.response?.data);
      if (error.response?.status === 401) {
        console.log('Unauthorized: Check API key');
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
  return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>@{user.username || user.email.split('@')[0]}</td>
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
         pageLinkClassName='page-link'
         previousClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        nextClassName="page-item"
        containerClassName="pagination"
        activeClassName="active"
     />
    </div>
  );
}

export default TableUsers;