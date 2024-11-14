const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const {
    title,
    author,
    url,
    likes
  } = request.body

  try {
    const user = request.user

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', middleware.userExtractor, (request, response, next) => {
  const {
    title,
    author,
    url,
    likes
  } = request.body

  Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user: request.user.id },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (user._id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: 'user invalid' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
    await user.save()
    
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter