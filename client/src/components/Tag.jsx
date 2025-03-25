import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';

function Tag({ text }) {
  return (
    <Link to={`/tags/${text}/products`}>
      <Chip color="secondary" sx={{ mr: 1, mb: 1 }} label={text}></Chip>
    </Link>
  );
}

export default Tag;
