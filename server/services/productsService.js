const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');

const constraints = {
  title: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: '^Titeln måste vara minst %{count} tecken lång.',
      tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
    }
  }
};




async function getById(id) {
  try {
    const product = await db.product.findOne({
      where: { id },
      include: [
        db.user,
        
        {
          model: db.comment,
          include: [db.user]
        }
      ]
    });
    /* Om allt blev bra, returnera product */
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    // Lägg till loggning för felsökning
    const products = await db.product.findAll();
    console.log("Found products:", products.length);
    return products;
  } catch (error) {
    console.error("Error in getAll:", error);
    throw error;
  }
}



async function create(product) {
  const invalidData = validate(product, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    console.log('Skapar produkt:', product); 
    const newProduct = await db.product.create(product);

    return createResponseSuccess(newProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(product, id) {
  const invalidData = validate(product, constraints);
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const existingProduct = await db.product.findOne({ where: { id } });
    if (!existingProduct) {
      return createResponseError(404, 'Hittade ingen produkt att uppdatera.');
    }

    return createResponseMessage(200, 'Produkten uppdaterades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.product.destroy({
      where: { id }
    });
    return createResponseMessage(200, 'Produkten raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

function _formatProduct(product) {
  const cleanProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    body: product.body,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    author: {
      id: product.user.id,
      username: product.user.username,
      email: product.user.email,
      firstName: product.user.firstName,
      lastName: product.user.lastName,
      imageUrl: product.user.imageUrl
    },
   
  };

  if (product.comments) {
    cleanProduct.comments = [];

    product.comments.map((comment) => {
      return (cleanProduct.comments = [
        {
          title: comment.title,
          body: comment.body,
          author: comment.user.username,
          createdAt: comment.createdAt
        },
        ...cleanProduct.comments
      ]);
    });
  }

}


module.exports = {

  
  getById,
  getAll,
  create,
  update,
  destroy,
  _formatProduct
};