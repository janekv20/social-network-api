const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');
const { route } = require('./thought-routes');

//set up get all and post routes
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

//set up get, put and delete routes
router
    route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

//set up routes to add/remove friend
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;