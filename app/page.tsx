import Link from 'next/link'
import { getAllPosts } from '../lib/posts'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center text-6xl">
                🐕
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Laughs & Laundry
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100">
              Real life, real solutions, real laughs
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-teal-50">
              Managing the beautiful chaos of family life with practical systems, 
              teen parenting wisdom, and neurodivergent-friendly solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/posts" 
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                Browse Posts
              </Link>
              <Link 
                href="#newsletter" 
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
              >
                Join Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What You'll Find Here
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Five core areas to help you thrive in the beautiful chaos of family life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏠',
                title: 'Household Systems',
                description: 'Cleaning routines, organization solutions, and decluttering strategies that actually work for busy families',
                color: 'bg-emerald-100 text-emerald-800'
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Teen Parent Life',
                description: 'Navigating the unique challenges of parenting older kids and preparing teens for independence',
                color: 'bg-purple-100 text-purple-800'
              },
              {
                icon: '💰',
                title: 'Family Finance',
                description: 'Budgeting with teenagers, college prep, and teaching financial literacy to teens',
                color: 'bg-amber-100 text-amber-800'
              },
              {
                icon: '⏰',
                title: 'Time Management',
                description: 'Juggling work, household, family activities, and self-care for busy parents',
                color: 'bg-red-100 text-red-800'
              },
              {
                icon: '🧠',
                title: 'Neurodivergent-Friendly',
                description: 'ADHD-friendly systems, supporting neurodivergent teens, and executive function building',
                color: 'bg-cyan-100 text-cyan-800'
              }
            ].map((pillar, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 rounded-full ${pillar.color} flex items-center justify-center text-2xl mb-4`}>
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Latest Posts
            </h2>
            <p className="text-xl text-gray-600">
              Fresh insights from the trenches of family life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post) => (
              <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <Link 
                      href={`/posts/${post.slug}`}
                      className="text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/posts"
              className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section id="newsletter" className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join the Community
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Get weekly tips, printables, and real talk about managing family life 
            delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-teal-200 mt-4">
            Free toolkit for subscribers: cleaning schedules, meal planning templates, and more!
          </p>
        </div>
      </section>
    </div>
  )
}