const { Description, User } = require('../models');

const descriptionController = {
    // add description to user
    addDescription({ params, body }, res) {
        console.log(body);
        Description.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { description: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No description with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    removeDescription({ params }, res) {
        Description.findOneAndDelete({ _id: params.descriptionId })
            .then(deletedDescription => {
                if (!deletedDescription) {
                    res.status(404).json({ message: 'No user found with this is' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { description: params.descriptionId } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No description found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = descriptionController;
