const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//set up get routes
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//set up get one, put and delete
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

//set up add reaction
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

//set up remove reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;
