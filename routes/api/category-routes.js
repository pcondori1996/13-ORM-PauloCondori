const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: Product
      // be sure to include its associated Products
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  try { 
    const categoryData = await Category.findAll ({
      include: Product
      // be sure to include its associated Products
    })
    res.status(200).json(productData);

    if (!productData) {
      res.status(400).json({ message: 'No user with this id!' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
          // delete one product by its `id` value
        id: req.body.id,
      },
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(400).json({ message: 'Selected Category was deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
