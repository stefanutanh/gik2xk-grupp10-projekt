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

async function getByTag(tagName) {
  try {
    const tag = await db.tag.findOne({ where: { name: tagName } });
    const allProducts = await tag.getProducts({ include: [db.user, db.tag] });
    /* Om allt blev bra, returnera allProducts */
    return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getByAuthor(userId) {
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    const allProducts = await user.getProducts({ include: [db.user, db.tag] });
    /* Om allt blev bra, returnera allProducts */
    return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const product = await db.product.findOne({
      where: { id },
      include: [
        db.user,
        db.tag,
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
    const allProducts = await db.product.findAll({ include: [db.user, db.tag] });
    /* Om allt blev bra, returnera allProducts */
    return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addComment(id, comment) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    comment.productId = id;
    const newComment = await db.comment.create(comment);
    return createResponseSuccess(newComment);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(product) {
  const invalidData = validate(product, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const newProduct = await db.product.create(product);
    
    //lägg till eventuella taggar
    await _addTagToProduct(newProduct, product.tags);

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
    await _addTagToProduct(existingProduct, product.tags);
    await db.product.update(product, {
      where: { id }
    });
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
    tags: []
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

  if (product.tags) {
    product.tags.map((tag) => {
      return (cleanProduct.tags = [tag.name, ...cleanProduct.tags]);
    });
    return cleanProduct;
  }
}

async function _findOrCreateTagId(name) {
  name = name.toLowerCase().trim();
  const foundOrCreatedTag = await db.tag.findOrCreate({ where: { name } });

  return foundOrCreatedTag[0].id;
}

async function _addTagToProduct(product, tags) {
  await db.productTag.destroy({ where: { productId: product.id } });

  if (tags) {
    tags.forEach(async (tag) => {
      const tagId = await _findOrCreateTagId(tag);
      await product.addTag(tagId);
    });
  }
}

module.exports = {
  getByTag,
  getByAuthor,
  getById,
  getAll,
  addComment,
  create,
  update,
  destroy
};