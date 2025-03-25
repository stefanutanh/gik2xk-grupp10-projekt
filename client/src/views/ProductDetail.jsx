import ProductItemLarge from '../components/ProductItemLarge';
import CommentForm from '../components/CommentForm';
import Comment from '../components/comment';
import { Alert, Box, Button, Container, List, Typography, Snackbar } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addComment, getOne } from '../services/ProductService';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import Rating from '@mui/material/Rating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart } from '../services/CartService';


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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

  useEffect(() => {
    getOne(id)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error("ProductDetail: fel vid hämtning av produkt:", error);
      });
  }, [id]);

  function onCommentAdd(comment) {
    addComment(product.id, comment)
      .then(() => getOne(id))
      .then((product) => setProduct(product))
      .catch((error) => {
        console.error("Fel vid att lägga till kommentar:", error);
      });
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
            color="primary"
            variant="contained"
            onClick={handleAddToCart}
            endIcon={<ShoppingCartIcon />}
          >
            KÖP!!
          </Button>

          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            Redigera produkt
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  ) : (
    <Typography variant="h5">Kunde inte hämta produkt</Typography>
  );
}
export default ProductDetail;
