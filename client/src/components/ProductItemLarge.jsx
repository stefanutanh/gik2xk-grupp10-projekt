import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from '@mui/material';

import placeholderImage from '../assets/productpictures/placeholder.png';

function ProductItemLarge({ product }) {
  return (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2 }} elevation={3}>
      <Box>
        <Typography variant="h2">{product.title}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
        {product.price ? `Pris: ${parseFloat(product.price).toFixed(2)} SEK` : 'Pris ej tillgängligt'}
        </Typography>
      </Box>
      <Card elevation={0}>
        <CardMedia component="img" image={product.imageUrl || placeholderImage} />
      
      </Card>
    </Paper>
  );
}

export default ProductItemLarge;
