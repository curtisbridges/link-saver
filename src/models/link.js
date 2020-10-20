const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    thumbnail: {
      type: Buffer,
      required: false,
    },
    condensed: {
      type: Buffer,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Link = mongoose.model('Link', linkSchema)

module.exports = Link
