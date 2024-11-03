const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const total = blogs.reduce((acc, blog) => acc + blog.likes, 0)

  return total
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((fav, blog) =>
    fav.likes > blog.likes ? fav : blog
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}