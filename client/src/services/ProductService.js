import axios from './api';

export async function getAll(endpoint = '/products') {
  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) return response.data;
    else {
      console.log(response);
      return [];
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return []; // Returnera tom array istället för undefined
  }
}

export async function getOne(id) {
  console.log("Försöker hämta produkt med id:", id);
  try {
    const response = await axios.get(`/products/${id}`);
    console.log("API svar:", response);
    if (response.status === 200) return response.data;
    else {
      console.log("API svarade med status som inte är 200:", response.data);
      return null;
    }
  } catch (e) {
    console.log("Ett fel uppstod vid hämtning av produkt:", e);
    e?.response ? console.log("API felmeddelande:", e.response.data) : console.log("Feldetaljer:", e);
    return null; 
  }
}




export async function create(product) {
  try {
    const response = await axios.post('/products', product);
    if (response.status === 200) return response.data;
    else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null; 
  }
}

export async function update(product) {
  try {
    const response = await axios.put('/products', product);
    if (response.status === 200) return response.data;
    else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null; 
  }
}

export async function remove(id) {
  try {
    const response = await axios.delete('/products', { data: { id } });
    if (response.status === 200) return response.data;
    else {
      console.log(response.data); 
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null; 
  }
}

export async function addComment(productId, comment) {
  try {
    const response = await axios.post(`/products/${productId}/addComment`, comment); // Ändrat från product till product
    if (response.status === 200) return response.data;
    else {
      console.log(response.data); 
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null; 
  }
}


