import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { create, getOne, remove, update } from '../services/ProductService';
import {
  Box,
  Button,
  Chip,
  Container,
  TextField,
  Typography
} from '@mui/material';
import TagField from '../components/TagField';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emptyProduct = {
    id: 0,
    title: '',
    body: '',
    imageUrl: '',
    tags: [],
    userId: 2
  };
  /* const [product, setProduct] = useState(emptyProduct); */
  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    if (id) {
      getOne(id).then((product) => setProduct(product));
    } else {
      setProduct(emptyProduct);
    }
  }, [id]);
  

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newproduct = { ...product, [name]: value };
    setProduct(newproduct);
  }

  function onSave() {
    if (product.id === 0) {
      create(product).then((response) => {
        navigate('/', {
          replace: true,
          state: { message: `Produkten ${response.title} skapades.` }
        });
      });
    } else {
      update(product).then((response) =>
        navigate(`/products/${product.id}`, { replace: true, state: response })
      );
    }
  }

  function onDelete() {
    remove(product.id).then((response) =>
      navigate('/', { replace: true, state: response })
    );
  }

  function onTagAdd(tagString) {
    //splitta arrayen vid kommatecken
    const tagArray = tagString.split(',');
    //trimma whitespace runt taggar
    const uniqueAndTrimmedTags = tagArray
      .map((tag) => tag.trim())
      .filter((tag) => !product.tags.includes(tag));

    //slå samman befintlig tag-array med de nya, unika taggarna
    const mergedArray = [...product.tags, ...uniqueAndTrimmedTags];

    //spara befintligt inlägg med nya tags-arrayen till state.
    setProduct({ ...product, tags: mergedArray });
  }

  function onTagDelete(tagToDelete) {
    const newTags = product.tags.filter((tag) => tag !== tagToDelete);

    setProduct({ ...product, tags: newTags });
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2">
        {product.id ? 'Ändra produkt' : 'Skapa produkt'}
      </Typography>
      <Box mt={4}>
        <form>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.title}
              name="title"
              id="title"
              label="Titel"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.body}
              multiline
              minRows={5}
              name="body"
              id="body"
              label="Innehåll"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.price}
              minRows={5}
              name="price"
              id="price"
              label="Pris"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.imageUrl}
              name="imageUrl"
              id="imageUrl"
              label="Sökväg till bild"
            />
          </Box>
          <Box mt={1}>
            {product?.tags?.length > 0 &&
              product.tags.map((tag) => (
                <Chip
                  sx={{ mr: 1 }}
                  onDelete={() => onTagDelete(tag)}
                  key={tag}
                  label={tag}
                />
              ))}
          </Box>
          <Box mt={2}>
            <TagField onSave={onTagAdd} />
          </Box>
          <Box display="flex" mt={2}>
            <Box flexGrow={1}>
              <Button
                startIcon={<ChevronLeftIcon />}
                sx={{ mr: 1 }}
                variant="contained"
                onClick={() => navigate(-1)}>
                Tillbaka
              </Button>
              {id && (
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={onDelete}
                  variant="contained"
                  color="error">
                  Ta bort
                </Button>
              )}
            </Box>
            <Button
              startIcon={<SaveIcon />}
              onClick={onSave}
              variant="contained"
              color="success">
              Spara
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default ProductEdit;
