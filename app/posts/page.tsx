import Link from 'next/link'
import { getAllPosts, getCategories, getTags } from '../../lib/posts'

export default function PostsPage() {
  const posts = getAllPosts()
  const categories = getCategories()
  const tags = getTags()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Posts
          </h1>
          <p className="text-xl text-gray-600">
            Real solutions for the beautiful chaos of family life
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="flex items-center justify-between text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">{category.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tags/${tag.slug}`}
                    className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full hover:bg-teal-200 transition-colors"
                  >
                    {tag.name} ({tag.count})
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Posts Grid */}
          <main className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featuredImage && (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.slice(0, 2).map((category) => (
                        <span key={category} className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      <Link 
                        href={`/posts/${post.slug}`}
                        className="hover:text-teal-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <Link 
                        href={`/posts/${post.slug}`}
                        className="text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Read more →
                      </Link>
                    </div>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet!</h3>
                <p className="text-gray-600">Check back soon for fresh content.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}