import PostItemSmall from './ProductItemSmall';
import { getAll } from '../services/ProductService';
import { useEffect, useState } from 'react';

function PostList({ pathname }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAll(pathname).then((posts) => {
      setPosts(posts);
    });
  }, [pathname]);

  return (
    <ul>
      {posts?.length > 0 ? (
        posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <li key={`posts_${post.id}`}>
              <PostItemSmall post={post} />
            </li>
          ))
      ) : (
        <h3>Kunde inte hämta produkter</h3>
      )}
    </ul>
  );
}

export default PostList;
