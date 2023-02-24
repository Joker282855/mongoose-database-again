const router = require('express').Router();
const userRoutes = require('./user-routes');
const descriptionRoutes = require('./description-routes');

router.use('/users', userRoutes);
router.use('/descripbed', descriptionRoutes);

module.exports = router;