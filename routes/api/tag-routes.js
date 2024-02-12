const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//-------------FIND ALL TAGS--------------//
router.get('/', async (req, res) => {
  Tag.findAll({include: [{model: Product,through: ProductTag}]}) 
  .then(tags => {
    res.status(200).json(tags) 
  });
});

//-------------FIND TAG BY ID--------------//
router.get('/:id', async (req, res) => {
  Tag.findOne({ where: {id: req.params.id},include: [{model:Product, through: ProductTag}]}) // double check if this is right
  .then(tags => {
    res.status(200).json(tags)
    res.json(tags) 
  });
});

//-------------CREATE NEW TAG--------------//
router.post('/', async (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    });
});

//-------------UPDATE TAG--------------//
router.put('/:id', async (req, res) => {
  Tag.update(req.body, {
    where: {
    id: req.params.id
   }
 });
});

//-------------DELETE TAGS--------------//
router.delete('/:id', async (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }  
  });
});

module.exports = router;
