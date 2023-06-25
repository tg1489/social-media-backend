const { Reaction, Thought, User } = require('../models');
const reactionSchema = require('../models/Reaction');

//api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSingleUserById = async (req, res) => {
  // /api/users/:userId
  try {
    const findUser = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends', 'username'); // Populate friends field and retrieve only the 'username' field

    if (!findUser) {
      res.status(400).json({ message: 'User with that ID does not exist.' });
    }
    res.json(findUser);
  } catch (err) {
    res.status(404).json(err);
  }
};

//api/users
exports.createNewUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateUserById = async (req, res) => {
  // /api/users/:userId
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updateUser) {
      res.json({ message: 'No user with this ID exists.' });
    }

    res.json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteUserById = async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });

    if (!deleteUser) {
      res.json({ message: 'User has been already deleted or does not exist.' });
    }

    await Thought.deleteMany({ _id: { $in: User.thoughts } });
    res.json({ message: 'User has been successfully deleted.' });
  } catch (err) {
    res.status(500).json(err);
  }
};

//api/users/:userId/friends/:friendId
exports.addNewFriend = async (req, res) => {
  try {
    const userId = await User.findOne({ _id: req.params.userId });
    const friendId = await User.findOne({ _id: req.params.friendId });
    if (!userId) {
      console.log('No user by that id.');
    }
    if (!friendId) {
      console.log('No friend by that id.');
    }
    userId.friends.push(friendId);
    await userId.save();

    res.json(userId);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const userId = await User.findOne({ _id: req.params.userId });
    const friendId = await User.findOneAndRemove({ _id: req.params.friendId });
    if (!userId) {
      console.log('No user by that ID exists.');
    }
    if (!friendId) {
      console.log('No friend by that ID exists.');
    }
    userId.friends.pull(friendId); // Remove from the array.
    await userId.save();

    res.json(userId);
  } catch (err) {
    res.status(500).json(err);
  }
};

//api/thoughts
exports.getAllThoughts = async (req, res) => {
  try {
    const getAll = await Thought.find();
    res.json(getAll);
  } catch (err) {
    res.status(500).json(err);
  }
};
// api/thoughts/:thoughtId
exports.getSingleThoughtById = async (req, res) => {
  try {
    const getThoughtById = await Thought.findOne({ _id: req.params.thoughtId });
    res.json(getThoughtById);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.createNewThought = async (req, res) => {
  // push the created thought's _id to the associated user's thoughts array field
  try {
    const newThought = await Thought.create(req.body); // Get new thought
    const user = await User.findOne({ username: req.body.username }); // Assuming you can find the user by their username

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.thoughts.push(newThought._id); // User table. Thought Column. Push the newly created thought by id
    await user.save(); // Save user table

    res.json(newThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.updateThoughtById = async (req, res) => {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!updateThought) {
      res.status(404).json({ message: 'Thought does not exist.' });
    }
    res.json(updateThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteThoughtById = async (req, res) => {
  try {
    const deleteThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    if (!deleteThought) {
      console.log("Thought doesn't exist or has already been deleted.");
    }
    res.json(deleteThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// /api/thoughts/:thoughtId/reactions

exports.createReaction = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      console.log('Thought does not exist.');
    }

    const newReaction = await thought.reactions.create(req.body);

    thought.reactions.push(newReaction); // This is for the array in the reactions property in Thought table
    await thought.save();

    res.status(200).json(newReaction);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// to pull and remove a reaction by the reaction's reactionId value
exports.deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $unset: { reactions: 1 } },
      { new: true }
    );

    if (!thought) {
      console.log('Reaction not found or has already been deleted.');
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
