import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import logo from '../assets/logo2.png'; 
import playing from '../assets/musicplay.gif'; 
import load from '../assets/3.gif'; 
import axios from "axios";
import { Button } from '@mui/material';

const Dashboard = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch user data and albums
  useEffect(() => {
    const fetchUserAndAlbums = async () => {
      try {
        // Fetch albums
        const albumResponse = await axios.get(
          "https://osdb-api.confidence.sh/rest/toBKZWngMbag7OhWLoPqK/album?page=250&limit=2500"
        );
        const allAlbums = albumResponse.data.data;

        // Get token from localStorage and set authorization headers
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token,
          },
        };

        // Fetch user profile with preferences
        const userResponse = await axios.get('http://localhost:5000/api/profile', config);
        const userData = userResponse.data;
        setUser(userData); // Set user in state

        // Filter albums based on user preferences
        const filteredAlbums = allAlbums.filter(album =>
          album.genre.some(g => userData.preferences.includes(g.name))
        );

        // Set albums and loading states
        setAlbums(filteredAlbums);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchUserAndAlbums();
  }, []);

  if (loading) {
    return <center style={{paddingTop: '70px'}}><img src={load} alt="Loading.." width="200" /></center>;
  }

  return (
    <>
      <Navbar />
      
      {/* Greet the user */}
      {/* {user && <legend style={{  border: "1px solid #ccc", display: "flex", flexWrap: "wrap", paddingLeft: "70px" }}>Welcome {user.name}</legend>} */}

      <center><img src={logo} alt="Logo" width="200" /></center>
      <p style={{textAlign: 'center', color: 'white', backgroundColor: 'orange'}}>Song Recommendations based on your preferences</p>
      <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: "70px" }}>
        {albums.map((album) => (
          <div key={album.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", width: "250px", backgroundColor: 'white' }}>
            <img src={playing} alt={album.name} style={{ width: "100%"}} />
            <h3>{album.name}</h3>
            <p><strong>Artist:</strong> {album.artist.map((a) => a.name).join(", ")}</p>
            <p><strong>Year:</strong> {album.year}</p>
            <p><strong>Genre:</strong> {album.genre.map((g) => g.name).join(", ")}</p>
            <Button variant="contained" color="primary" fullWidth>
                Interested
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
