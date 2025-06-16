import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';

import { ToastContainer } from 'react-toastify';

function App() {
 

  return (
    <>
    <div className="app-container min-h-screen bg-gradient-to-br from-navy-900 to-navy-700">
      <Header />
      <Container className="py-6">
       
        <TableUsers />
      </Container>
   
    </div>

          <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"

      />
    
    </>
    
  );
}

export default App;