import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/Book.css"; // import CSS styles

function Book() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get('/endpoint/books')
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSelect = (book) => {
    console.log(`Selected book ${book.title}`);
    setSelectedBook(book);
    setShowPopup(true);
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  }

  return (
    <div>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Year</th>
            <th>Genre</th>
            <th>Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published_year}</td>
              <td>{book.genre}</td>
              <td>{book.copies}</td>
              <td>
                <button onClick={() => handleSelect(book)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedBook.title}</h2>
            <p>Author: {selectedBook.author}</p>
            <p>Published Year: {selectedBook.published_year}</p>
            <p>Genre: {selectedBook.genre}</p>
            <p>Copies: {selectedBook.copies}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Book;
