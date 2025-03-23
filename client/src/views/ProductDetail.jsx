import PostItemLarge from '../components/ProductItemLarge';
import CommentForm from '../components/RatingForm';
import Comment from '../components/Rating';
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

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    getOne(id).then((post) => setPost(post));
  }, [id]);

  function onCommentAdd(comment) {
    addComment(post.id, comment)
      .then(() => getOne(id))
      .then((post) => setPost(post));
  }

  function clearMessage() {
    window.history.replaceState({}, '');
  }

  return post ? (
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
        <PostItemLarge post={post} />
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
            onClick={() => navigate(`/posts/${post.id}/edit`)}
          >
            Lägg till i varukorg
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => navigate(`/posts/${post.id}/edit`)}
          >
            Ändra
          </Button>
        </Box>

        
        <BasicRating />

        <Box>
          <Typography variant="h3">Kommentarer</Typography>
          <CommentForm onSave={onCommentAdd} />
          {post.comments && (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {post.comments.map((comment, i) => (
                <Comment key={`comment_${i}`} comment={comment} />
              ))}
            </List>
          )}
        </Box>
      </Container>
    </>
  ) : (
    <h3>Kunde inte hämta inlägg</h3>
  );
}

export default PostDetail;
