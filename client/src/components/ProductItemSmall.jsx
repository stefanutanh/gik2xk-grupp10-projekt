import { Link, useNavigate } from 'react-router-dom';
import Tag from './Tag';
import { addToCart } from '../services/CartService'; // Import the addToCart method
import { useState } from 'react';
import { toRelativeDateString, truncate } from '../common/formatHelpers';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  
} from '@mui/material';
import placeholderImage from '../assets/productpictures/placeholder.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { grey } from '@mui/material/colors';

function ProductItemSmall({ product }) {
  const navigate = useNavigate();

  /* const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); */
  
  // lägg till i cart //
  const handleAddToCart = async () => {
    try {
      const result = await addToCart(1, product.id, 1);
      
      if (result) {
        setSnackbarMessage(`${product.title} tillagd i varukorgen`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Kunde inte lägga till produkten i varukorgen');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbarMessage('Ett fel inträffade');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  
  if (!product) {
    return <Card sx={{ maxWidth: 345, mb: 4, p: 2 }}>
      <Typography>Produktinformation saknas</Typography>
    </Card>;
  }

  return (
    <Card sx={{ maxWidth: 345, mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h5">
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {product.title}
            </Link>
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 140 }}
        image={product.imageUrl || placeholderImage}
        alt={`Bild till ${product.title}`}
      />
      <CardContent>
        <Box mb={2}>
          {product.tags && product.tags.length > 0 && product.tags.map((tag) => <Tag key={tag} text={tag} />)}
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {truncate(product.body, 100)}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
  {product.price 
    ? `Pris: ${Number(product.price).toFixed(2)} SEK` 
    : 'Pris ej tillgängligt'
  }
</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigate(`/products/${product.id}`)}
          endIcon={<ChevronRightIcon />}
        >
          Läs mer
        </Button>

     {   <Button
  color="primary"
  variant="contained"
  onClick={handleAddToCart}
  endIcon={<ShoppingCartIcon />}
>
  KÖP!!
</Button>}
      </CardActions>
    </Card>
  );
}

export default ProductItemSmall;