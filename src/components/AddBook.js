import React, { useState } from 'react';
import axios from 'axios';
import "../assets/Book.css"; // import CSS styles

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');
  const [copies, setCopies] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      title,
      author,
      published_year: publishedYear,
      genre,
      copies: parseInt(copies)
    };
    axios.post('/endpoint/books/create', newBook)
      .then(res => {
        setTitle('');
        setAuthor('');
        setPublishedYear('');
        setGenre('');
        setCopies('');
        setAlertMessage('Book saved successfully!');
      })
      .catch(err => console.log(err));
  };

  const handleAlertClose = () => {
    setAlertMessage('');
  };

  return (
    <div className='form-container'>
      {alertMessage && (
        <div className="alert">
          <span className="alert-message">{alertMessage}</span>
          <button className="alert-close" onClick={handleAlertClose}>x</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className='book-form'>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <label>
          Published Year:
          <input type="number" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} required />
        </label>
        <label>
          Genre:
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </label>
        <label>
          Copies:
          <input type="number" value={copies} onChange={(e) => setCopies(e.target.value)} required />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddBook;
