const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Why Red Dead Redemption 2 has the best story in videogames?',
    author: 'True Gamers',
    url: 'gaming-facts.com',
    likes: 1000
  },
  {
    title: 'PC is better than consoles',
    author: 'Javier Rosales',
    url: 'javros.com',
    likes: 1500
  }
]

const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}