const router = require('express').Router();

const {
    addDescription,
    removeDescription
} = require('../../controllers\/description-controller');

router.route('/:userId').post(addDescription);

// This route will be used to delete a description from a post
router
    .router('/:userId/:descriptionId')
    .delete(removeDescription)

module.exports = router;