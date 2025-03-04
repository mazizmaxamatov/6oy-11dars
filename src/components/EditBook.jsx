import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setTitle] = useState("");
  const [surname, setAuthor] = useState("");
  const [age, setAge] = useState("");
  const [ball, setBall] = useState("");
  const [datalocal, setData] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`).then((res) => {
      setTitle(res.data.name);
      setAuthor(res.data.surname);
      setAge(res.data.age);
      setBall(res.data.ball);
      setData(res.data.datalocal);
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/books/${id}`, { name, surname, age, ball, datalocal }).then(() => {
      navigate("/");
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      <h2 style={{ marginBottom: "15px" }}>✏️ Kitobni Tahrirlash</h2>
      <form 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "15px", 
          alignItems: "center", 
          padding: "20px", 
          backgroundColor: "white", 
          borderRadius: "10px", 
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)" 
        }}
        onSubmit={handleUpdate}
      >
        <input type="text" placeholder="Name" value={name} onChange={(e) => setTitle(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setAuthor(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Ball" value={ball} onChange={(e) => setBall(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="date" placeholder="data" value={datalocal} onChange={(e) => setData(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Yangilash</button>
      </form>
    </div>
  );
};

export default EditBook;
