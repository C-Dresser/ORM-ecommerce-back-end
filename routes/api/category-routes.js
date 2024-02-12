const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//---------------FIND ALL CATEGORIES--------------//
router.get('/', async (req, res) => {
  Category.findAll({ include: [Product] })
    .then((categories) => {
      res.json(categories);
    });
});

//-------------FIND CATEGORY BY ID----------------//
router.get('/:id', async (req, res) => {
  Category.findByPk(req.params.id, { include: [Product] })
    .then((category) => {
      res.json(category);
    });
});

//--------------CREATE NEW CATEGORY-------------//
router.post('/', async (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    });
});

//------------UPDATE CATEGORY-------------//
router.put('/:id', async (req, res) => {
  Category.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    });
});

//---------DELETE CATEGORY--------------//
router.delete('/:id', async (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  });
});

module.exports = router;
