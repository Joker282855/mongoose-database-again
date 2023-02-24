const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updatedUser,
    deleteUser
} = require('../../controllers/user-controller');

// route not identifed by an id
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updatedUser)
    .delete(deleteUser);

module.exports = router;