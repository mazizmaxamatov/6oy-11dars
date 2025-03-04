import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/books";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);


  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const addBook = async (newBook) => {
    setLoading(true);
    try {
      const res = await axios.post(API_URL, newBook);
      setBooks((prevBooks) => [...prevBooks, res.data]);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const updateBook = async (id, updatedBook) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${id}`, updatedBook);
      setBooks((prevBooks) => prevBooks.map((book) => (book.id === id ? updatedBook : book)));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const deleteBook = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, fetchBooks, addBook, updateBook, deleteBook };
}
