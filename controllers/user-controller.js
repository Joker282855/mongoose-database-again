const { User } = require('../models');

const userControl = {
    
    getAllUsers(req, res) {

        User.findAll({})
            .select('__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.josn(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },

    getUserById({ params }, res) {

        User.findOne({ _id: params.id })
            .select('__v')
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

    updatedUser({ params, boyd }, res) {

        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            });
            
    }
}