const { Description, User } = require('../models');

const descriptionController = {
    // add description to user
    addDescription({ params, body }, res) {
        console.log(body);
        Description.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts_id  } },
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
            .catch(err => res.status(500).json(err));
    },

    removeDescription({ params }, res) {
        Description.findByIdAndDelete({ _id: params.descriptionId })
            .then(dbDscriptionData => {
                if (!dbDscriptionData) {
                    res.status(404).json({ message: 'No description found with this id' });
                    return;
                }
                res.json(dbDscriptionData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = descriptionController;
