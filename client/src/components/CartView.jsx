import { useEffect, useState } from 'react';
/* import CartItemSmall from './CartItemSmall';
import { getAll } from '../services/cartService'; */

function CartList() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getAll().then((carts) => setCarts(carts));
  }, []);

  return (
    <>
      {carts?.length > 0 ? (
        <ul>
          {carts.map((cart) => (
            <li key={`carts_${cart.id}`}>
              <CartItemSmall style={{ marginBottom: '1rem' }} cart={cart} />
            </li>
          ))}
        </ul>
      ) : (
        <h3>Kunde inte hämta varor</h3>
      )}
    </>
  );
}

export default CartList;
