const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');
const { findAll } = require('../../models/Category');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: Product
      // be sure to include its associated Product data
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: Product
      // be sure to include its associated Product data
    })
    res.status(200).json(tagData);
    if (!tagData) {
      res.status(400).json({ message: 'No Tag with this id!' });
      return;
    }
  } catch (err) {

  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' })
      return;
    }

    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        // delete one product by its `id` value
        id: req.params.id,
      },
    })
    if (!tagData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(400).json({ message: 'Selected Tag was deleted' });
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
