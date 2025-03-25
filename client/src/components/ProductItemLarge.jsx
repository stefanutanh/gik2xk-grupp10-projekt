import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from '@mui/material';
import Tag from './Tag';
import placeholderImage from '../assets/productpictures/placeholder.png';

function ProductItemLarge({ product }) {
  return (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2 }} elevation={3}>
      <Box>
        <Typography variant="h2">{product.title}</Typography>
       
      </Box>
      <Card elevation={0}>
        <CardMedia component="img" image={product.imageUrl || placeholderImage} />
        <CardContent>
          {product.tags &&
            product.tags.map((tag) => <Tag key={`tag_${tag}`} text={tag} />)}
          <Typography variant="body2">{product.body}</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default ProductItemLarge;
