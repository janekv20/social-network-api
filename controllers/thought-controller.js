const { User, Thought } = require('../models');

const thoughtController = {
    //get all Thoughts
    getAllThoughts( req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-_v'
        })
        .select('-_v')
        .sort({_id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //get thoughts by id
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            //no thought found, send 404 error
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found for this id.' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //create thought to user
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: ' No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //update thought by user id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found for this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(404).json(err));
    },
    //delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found for this id.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .cath(err => res.json(err));
    },
    //add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true }
        )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: 'No thougth found for this user.' });
                    return;
                }
                res.json(dbReactionData);
            })
            .catch(err => res.json(err));
    },
    //remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => res.json(err));
    }

}

module.exports = thoughtController;
