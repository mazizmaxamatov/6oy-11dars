import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/books").then((res) => setBooks(res.data));
  }, []);

  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`).then(() => {
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      <Link to="/add">
        <button style={{ marginBottom: "15px", padding: "10px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>➕ Добавить</button>
      </Link>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {books.map((book) => (
          <li key={book.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", marginBottom: "10px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <span style={{ flex: 1, textAlign: "left", paddingLeft: "10px" }}>{book.name} - {book.surname} - {book.age} - {book.ball} - {book.datalocal}</span>
            <div>
              <Link to={`/edit/${book.id}`}>
                <button style={{ padding: "8px 12px", marginRight: "10px", backgroundColor: "#ffc107", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" }}>✏️</button>
              </Link>
              <button style={{ padding: "8px 12px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => deleteBook(book.id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
