import ProductItemLarge from '../components/ProductItemLarge';
import CommentForm from '../components/CommentForm';
import Comment from '../components/comment';
import { Alert, Box, Button, Container, List, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addComment, getOne } from '../services/ProductService';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import Rating from '@mui/material/Rating';

// Separat komponent för betygssystemet
function BasicRating() {
  const [value, setValue] = useState(2);

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography component="legend">Betyg</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log("ProductDetail: hämtar produkt med id:", id);
    getOne(id)
      .then((product) => {
        console.log("ProductDetail: hämtad produkt:", product);
        setProduct(product);
      })
      .catch((error) => {
        console.error("ProductDetail: fel vid hämtning av produkt:", error);
      });
  }, [id]);

  function onCommentAdd(comment) {
    addComment(product.id, comment)
      .then(() => getOne(id))
      .then((product) => setProduct(product));
  }

  function clearMessage() {
    window.history.replaceState({}, '');
  }

  return product ? (
    <>
      {message && open && (
        <Alert
          onClose={() => {
            setOpen(false);
            clearMessage();
          }}
          variant="filled"
          severity="success"
        >
          {message}
        </Alert>
      )}
      <Container maxWidth="lg">
        <ProductItemLarge product={product} />
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ChevronLeftIcon />}
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            Tillbaka
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            Lägg till i varukorg
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            Ändra
          </Button>
        </Box>

        
        <BasicRating />

        <Box>
          <Typography variant="h3">Kommentarer</Typography>
          <CommentForm onSave={onCommentAdd} />
          {product.comments && (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {product.comments.map((comment, i) => (
                <Comment key={`comment_${i}`} comment={comment} />
              ))}
            </List>
          )}
        </Box>
      </Container>
    </>
  ) : (
    <h3>Kunde inte hämta produkt</h3>
  );
}

export default ProductDetail;
