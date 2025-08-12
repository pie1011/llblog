import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, getPostContent } from '../../../lib/posts'
import { Metadata } from 'next'

interface PostPageProps {
  params: { slug: string }
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - LaughsAndLaundry',
    }
  }

  return {
    title: post.metaTitle || `${post.title} - LaughsAndLaundry`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const contentHtml = await getPostContent(params.slug)

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Post Header */}
        <header className="mb-8">
          <nav className="mb-6">
            <Link 
              href="/posts"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Back to Posts
            </Link>
          </nav>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.featuredImage && (
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            )}
            
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                    {category}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center text-gray-500 text-sm mb-6">
                <span>
                  Published on {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-teal-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-teal-100 hover:text-teal-800 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <Link 
              href="/posts"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              ← All Posts
            </Link>
            <Link 
              href="/"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Home →
            </Link>
          </div>
        </nav>
      </article>
    </div>
  )
}