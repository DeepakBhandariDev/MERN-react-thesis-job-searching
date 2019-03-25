const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Vac = require('../../models/Vac');

//Get api/vacs (all, private)
router.get('/', (req, res)=> {
    Vac.find()
        .sort({ date: -1})
        .then(vacs => res.json(vacs))

});

//Get post/vacs (all, public)
router.post('/',auth, (req, res)=> {
   const newVac = new Vac({
    title: req.body.title,
    city: req.body.city,
    desc: req.body.desc,
    sal: req.body.sal
   });

   newVac.save().then(vac => res.json(vac));
    
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id',auth, (req, res) => {
    Vac.findById(req.params.id)
      .then(vac => vac.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;