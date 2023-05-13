import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import '../assets/Home.css';

function Home() {
  const { user, logout } = useContext(UserContext);
  return (
    <div className="container">
      {user ? (
        <div>
          <h1>Welcome to the Library App</h1>
          <h2>{`Welcome, ${user.first_name} ${user.last_name}! You are logged in as ${user.role}.`}</h2>
          <div className="card-container">
            <div className="card">
              <h2>Add User</h2>
              <Link to="/addUser">Go to form</Link>
            </div>
            <div className="card">
              <h2>Books</h2>
              <Link to="/books">See all books</Link>
            </div>
            <div className="card">
              <h2>Add a new Book</h2>
              <Link to="/books/add">Go to form</Link>
            </div>
            <div className="card">
              <h2>Logout</h2>
              <Link to="/">Logout</Link>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Home;
