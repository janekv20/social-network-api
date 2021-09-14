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
        Thought.findOne({_id: Params.id })
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
}
