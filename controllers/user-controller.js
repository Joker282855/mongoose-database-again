const { User, Description } = require('../models');

const userController = {
    
    getAllUsers(req, res) {

        User.find({})
            .populate({
                path: 'description',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },

    getUserById({ params }, res) {

        User.findOne({ _id: params.id })
            .populate({
                path: 'description',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {

                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    createUser({ body }, res) {

        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(404).json(err));
    },

    updatedUser({ params, body }, res) {

        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));           
   },

   deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })   
            .catch( err => res.status(400).json(er));
   }
}

module.exports = userController;