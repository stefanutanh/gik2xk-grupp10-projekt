import { Link, useNavigate } from 'react-router-dom';
import Tag from './Tag';
import UserItemSmall from './UserItemSmall';
import { toRelativeDateString, truncate } from '../common/formatHelpers';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import placeholderImage from '../assets/productpictures/placeholder.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { grey } from '@mui/material/colors';

function ProductItemSmall({ product }) {
  const navigate = useNavigate();
  
  // Guard clause to prevent rendering if product is undefined
  if (!product) {
    return <Card sx={{ maxWidth: 345, mb: 4, p: 2 }}>
      <Typography>Produkt information saknas</Typography>
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
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigate(`/products/${product.id}`)}
          endIcon={<ChevronRightIcon />}
        >
          Läs mer
        </Button>
        <Button
          
          endIcon={<ChevronRightIcon />}
        >
          KÖP!!
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductItemSmall;