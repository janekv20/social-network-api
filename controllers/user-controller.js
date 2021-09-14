const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //get a user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__V'
            })
            .select(-__v)
            .then(dbUserData => {
                //no user found, send 404 error message
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.loge(err);
                res.status(400).json(err);
            });
    }
}