import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const Home = () => {
  const musicCatalog = [
    { id: 1, title: 'Classical', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Rock', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Jazz', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Hip-Hop', imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Music Catalogue
      </Typography>
      <Grid container spacing={3}>
        {musicCatalog.map((music) => (
          <Grid item key={music.id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" height="150" image={music.imageUrl} />
              <CardContent>
                <Typography variant="h6">{music.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
