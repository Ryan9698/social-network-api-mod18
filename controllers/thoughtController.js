const User = require("../models/User");
const Thought = require("../models/Thought");

// Get all thoughts
async function getAllThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
}

// Get a single thought by id
async function getThoughtById(req, res) {
  try {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(thought);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
}

// Create a new thought
async function createThought(req, res) {
  const { thoughtText, username, userId } = req.body;

  try {
    const newThought = new Thought({ thoughtText, username, userId });
    const savedThought = await newThought.save();

    await User.findByIdAndUpdate(userId, {
      $push: { thoughts: savedThought._id },
    });

    res.status(201).json(savedThought);
  } catch (err) {
    res.status(400).json({ error: "Bad Request", message: err.message });
  }
}

// Update a thought by id
async function updateThoughtById(req, res) {
  const { thoughtText } = req.body;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      { thoughtText },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: "Bad Request", message: err.message });
  }
}

// Delete a thought by id
async function deleteThoughtById(req, res) {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if (!deletedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json({ message: "Thought deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
}

// Create reaction
async function createReaction(req, res) {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: "Bad Request", message: err.message });
  }
}

// Remove reaction
async function removeReaction(req, res) {
  const { thoughtId, reactionId } = req.params;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(updatedThought);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
}

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  removeReaction,
};
