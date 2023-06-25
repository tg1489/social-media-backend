const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

reactionSchema.virtual('virtualCreatedAt').get(function () {
  // This will format the createdAt timestamp when desired.
  return this.createdAt.toLocaleString();
});

module.exports = reactionSchema;
