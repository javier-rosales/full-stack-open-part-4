const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 5
  },
  important: Boolean
})

module.exports = mongoose.model('Blog', blogSchema)