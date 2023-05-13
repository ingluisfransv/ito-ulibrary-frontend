import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/Book.css"; // import CSS styles

function Book() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [checkoutBooks, setCheckoutBooks] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/endpoint/books`)
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

  const handleCheckout = () => {
    if (!selectedBook) {
      return;
    }
    console.log(selectedBook);
    const bookId = selectedBook._id;
    const updatedBook = {
      ...selectedBook,
      copies: selectedBook.copies - 1
    };
    axios
      .put(`${process.env.REACT_APP_API_URL}/endpoint/books/checkout/${bookId}`, updatedBook)
      .then(res => {
        axios.get(`${process.env.REACT_APP_API_URL}/endpoint/books`).then(res => {
          setBooks(res.data);
        });
      })
      .catch(err => console.log(err));
    setSelectedBook(updatedBook);
    setCheckoutBooks(prevCheckoutBooks => {
      const bookIndex = prevCheckoutBooks.findIndex(
        book => book._id === updatedBook._id
      );
      if (bookIndex >= 0) {
        // Replace existing book with updated version
        const newCheckoutBooks = [...prevCheckoutBooks];
        newCheckoutBooks.splice(bookIndex, 1, updatedBook);
        return newCheckoutBooks;
      } else {
        // Add new book to checkout list
        return [...prevCheckoutBooks, updatedBook];
      }
    });
    setIsCheckingOut(true);
  };
  
  
  
  

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
            {selectedBook.copies > 0 ? (
              <button onClick={handleCheckout} disabled={isCheckingOut}>Check Out</button>
            ) : (
              <p>Out of Stock</p>
            )}
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
      <h3>Checked Out Books</h3>
      <ul>
        {checkoutBooks.map(book => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Book;
