import ProductItemSmall from './ProductItemSmall';
import { getAll } from '../services/ProductService';
import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

function ProductList({ pathname }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAll(pathname).then((posts) => {
      setPosts(posts);
    });
  }, [pathname]);

  return (
    <>
      {posts?.length > 0 ? (
        <Grid container spacing={2}>
          {posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <Grid item xs={12} sm={6} md={4} key={`posts_${post.id}`}>
                <ProductItemSmall post={post} />
              </Grid>
            ))}
        </Grid>
      ) : (
        <Typography variant="h5">Kunde inte hämta produkter</Typography>
      )}
    </>
  );
}

export default ProductList;
