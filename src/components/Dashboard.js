import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../assets/logo2.png'; 
import playing from '../assets/musicplay.gif'; 
import axios from "axios";
const Dashboard = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
    // Fetching the data from the API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://osdb-api.confidence.sh/rest/toBKZWngMbag7OhWLoPqK/album?page=20&limit=50"
        );
        setAlbums(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
        {/* <p> Welcome ${user.name}</p> */}
        <div></div>
      <center><img src={logo} alt="Logo" width="200" /> </center>
      <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: "70px" }}>
        {albums.map((album) => (
          <div key={album.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", width: "250px" }}>
            <img src={playing} alt={album.name} style={{ width: "100%", height: "50%" }} />
            <h3>{album.name}</h3>
            <p><strong>Artist:</strong> {album.artist.map((a) => a.name).join(", ")}</p>
            <p><strong>Year:</strong> {album.year}</p>
            <p><strong>Genre:</strong> {album.genre.map((g) => g.name).join(", ")}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
