import axios from './api';

  export async function getAll(endpoint = '/cart') {
    try {
        const response = await axios.get(endpoint);

        if(response.status === 200) return response.data;
        else {
            console.log(response);
            return [];
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
        return [];
    }
}
// Hämta en specifik användares varukorg
export async function getUserCart(userId) {
  try {
    const response = await axios.get(`/users/${userId}/getCart`);
    if (response.status === 200) {
      return extractData(response.data);
    } else {
      console.log(response);
      return [];
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return [];
  }
}

// Lägg till produkt i varukorgen
export async function addToCart(userId, productId, amount) {
  try {
    const response = await axios.post('/cart/addProduct', {
      userId,
      productId,
      amount
    });
    if (response.status === 200) {
      return extractData(response.data);
    } else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null;
  }
}

// Uppdatera antal av en produkt i varukorgen
export async function updateCartItem(cartRowId, amount) {
  try {
    const response = await axios.put('/cart/updateProduct', {
      cartRowId,
      amount
    });
    if (response.status === 200) {
      return extractData(response.data);
    } else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null;
  }
}

// Ta bort en produkt från varukorgen
export async function removeFromCart(cartRowId) {
  try {
    const response = await axios.delete('/cart/removeProduct', {
      data: { cartRowId }
    });
    if (response.status === 200) {
      return extractData(response.data);
    } else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null;
  }
}

// Töm hela varukorgen
export async function clearCart(cartId) {
  try {
    const response = await axios.delete('/cart', {
      data: { cartId }
    });
    if (response.status === 200) {
      return extractData(response.data);
    } else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null;
  }
}