import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AddUser from './components/User';
import BookList from './components/Book';
import AddBook from './components/AddBook';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/add" element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

