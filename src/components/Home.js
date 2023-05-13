import { Link } from 'react-router-dom';
import '../assets/Home.css';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to the Library App</h1>
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
    </div>
  );
}

export default Home;
