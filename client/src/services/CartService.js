import axios from './api';

// Hjälpfunktion för att hantera data från servern
function extractData(response) {
  return response && response.data ? response.data : response;
}

export async function getAll(endpoint = '/cart') {
  try {
    const response = await axios.get(endpoint);
    if (response.status === 200) return response.data;
    else {
      console.log('Oväntat svar från server:', response);
      return [];
    }
  } catch (e) {
    console.error('Fel vid hämtning av varukorg:', e?.response?.data || e.message || e);
    return []; // Returnera tom array istället för undefined
  }
}

// Hämta användarens varukorg
export async function getCart(userId) {
  try {
    const response = await axios.get(`/users/${userId}/getCart`);
    if (response.status === 200) return response.data;
    else {
      console.log('Oväntat svar från server:', response);
      return [];
    }
  } catch (e) {
    console.error('Fel vid hämtning av varukorg:', e?.response?.data || e.message || e);
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
    if (response.status === 200) return response.data;
    else {
      console.log('Oväntat svar från server:', response);
      return null;
    }
  } catch (e) {
    console.error('Fel vid tillägg i varukorg:', e?.response?.data || e.message || e);
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
    if (response.status === 200) return response.data;
    else {
      console.log('Oväntat svar från server:', response);
      return null;
    }
  } catch (e) {
    console.error('Fel vid uppdatering av varukorg:', e?.response?.data || e.message || e);
    return null;
  }
}

// Ta bort en produkt från varukorgen
export async function removeFromCart(cartRowId) {
  try {
    const response = await axios.delete('/cart/removeProduct', {
      data: { cartRowId }
    });
    if (response.status === 200) return response.data;
    else {
      console.log('Oväntat svar från server:', response);
      return null;
    }
  } catch (e) {
    console.error('Fel vid borttagning av produkt:', e?.response?.data || e.message || e);
    return null;
  }
}

// Töm hela varukorgen
export async function clearCart(cartId) {
  try {
    const response = await axios.delete('/cart', {
      data: { cartId }
    });
    if (response.status === 200) return response.data;
    else {
      console.log('Oväntat svar från server:', response);
      return null;
    }
  } catch (e) {
    console.error('Fel vid tömning av varukorg:', e?.response?.data || e.message || e);
    return null;
  }
}

// Hjälpfunktion för att ändra mängd
export async function reduceAmount(userId, productId) {
  try {
    const response = await axios.post('/cart/reduceAmount', {
      userId,
      productId
    });
    if (response.status === 200) return response.data;
    else {
      console.log('Oväntat svar från server:', response);
      return null;
    }
  } catch (e) {
    console.error('Fel vid minskning av antal:', e?.response?.data || e.message || e);
    return null;
  }
}

// Hjälpfunktion för att öka mängd
export async function increaseAmount(userId, productId) {
  try {
    const response = await axios.post('/cart/increaseAmount', {
      userId,
      productId
    });
    if (response.status === 200) return response.data;
    else {
      console.log('Oväntat svar från server:', response);
      return null;
    }
  } catch (e) {
    console.error('Fel vid ökning av antal:', e?.response?.data || e.message || e);
    return null;
  }
}