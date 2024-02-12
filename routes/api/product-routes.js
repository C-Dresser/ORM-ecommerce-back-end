const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

//-------------GET ALL PRODUCTS-------------------//

router.get('/', async (req, res) => {
  Product.findAll({ include: [Category, Tag] })
    .then(products => {
      res.json(products)
    });
});

//-------------GET ONE PRODUCT-------------------//
router.get('/:id', async (req, res) => {
  Product.findByPk(req.params.id, { include: [Category, Tag] })
    .then(product => {
      res.json(product)
    });
});

//-------------CREATE NEW PRODUCT-------------------//

router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const product = await Product.create(req.body);
    // if there's product tags, we need to create pairings by using the setTags method
    if (req.body.tagIds) {
      await product.setTags(req.body.tagIds);
      await product.save();
      return res.status(200).json(await product.getTags());
    }
    // if no product tags, just respond
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//-------------UPDATE PRODUCT-------------------//

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Tag],
    });
    // update product data
    product.update(req.body);
    // if there's product tags, we need to create pairings by using the setTags method
    if (req.body.tagIds) {
      await product.setTags(req.body.tagIds);
    }
    await product.save();
    await product.reload();
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//-------------DELETE PRODUCT-------------------//

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;  
    }

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    if (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
