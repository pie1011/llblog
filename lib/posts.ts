// lib/posts.ts - Simple markdown blog helper
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  published: boolean
  categories: string[]
  tags: string[]
  featuredImage?: string
  metaTitle?: string
  metaDescription?: string
}

export function getAllPosts(): PostData[] {
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return getSamplePosts()
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)

        return {
          id,
          slug: id,
          title: matterResult.data.title || 'Untitled',
          date: matterResult.data.date || new Date().toISOString(),
          excerpt: matterResult.data.excerpt || '',
          content: matterResult.content,
          published: matterResult.data.published !== false,
          categories: matterResult.data.categories || [],
          tags: matterResult.data.tags || [],
          featuredImage: matterResult.data.featuredImage,
          metaTitle: matterResult.data.metaTitle,
          metaDescription: matterResult.data.metaDescription,
        } as PostData
      })
      .filter(post => post.published)
      .sort((a, b) => (a.date < b.date ? 1 : -1))

    return allPostsData.length > 0 ? allPostsData : getSamplePosts()
  } catch (error) {
    console.error('Error reading posts:', error)
    return getSamplePosts()
  }
}

export function getPostBySlug(slug: string): PostData | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostContent(slug: string): Promise<string> {
  const post = getPostBySlug(slug)
  if (!post) return ''

  const processedContent = await remark()
    .use(html)
    .process(post.content)
  
  return processedContent.toString()
}

export function getCategories() {
  const posts = getAllPosts()
  const categoryCount: { [key: string]: number } = {}
  
  posts.forEach(post => {
    post.categories.forEach(category => {
      categoryCount[category] = (categoryCount[category] || 0) + 1
    })
  })

  return Object.entries(categoryCount).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    count
  }))
}

export function getTags() {
  const posts = getAllPosts()
  const tagCount: { [key: string]: number } = {}
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  return Object.entries(tagCount).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    count
  }))
}

// Sample posts when no markdown files exist
function getSamplePosts(): PostData[] {
  return [
    {
      id: 'welcome-to-the-beautiful-chaos',
      slug: 'welcome-to-the-beautiful-chaos',
      title: 'Welcome to the Beautiful Chaos',
      date: new Date().toISOString(),
      excerpt: 'Meet our family and discover how we manage the beautiful chaos of household systems, teen parenting, and neurodivergent-friendly living.',
      content: `# Welcome to LaughsAndLaundry!

Hi there! I'm so excited you've found your way here. If you're a parent juggling household management, work, family life, and maybe a neurodivergent kid or two, you're in the right place.

## Our Story

Meet Bandit, our family mascot and the inspiration behind our logo. Just like Bandit brings joy and a little chaos to our home, we believe that family life should be filled with both laughter and practical solutions.

## What You'll Find Here

- **Real household systems** that actually work for busy families
- **Teen parenting insights** from the trenches
- **ADHD and neurodivergent-friendly** organization tips
- **Budget-friendly family planning** strategies
- And lots of **real talk** about the beautiful mess of family life

Welcome to our community!`,
      published: true,
      categories: ['Household Systems & Organization'],
      tags: ['Welcome', 'Organization'],
      metaTitle: 'Welcome to LaughsAndLaundry - Real Life, Real Solutions, Real Laughs',
      metaDescription: 'Join our community of parents managing the beautiful chaos of family life with practical household systems and neurodivergent-friendly solutions.'
    },
    {
      id: '15-minute-reset-adhd',
      slug: '15-minute-reset-adhd',
      title: 'The 15-Minute Reset: How to Tidy Your House When You Have ADHD',
      date: new Date(Date.now() - 86400000).toISOString(),
      excerpt: 'A simple system that works even when your brain says "absolutely not" to cleaning.',
      content: `# The 15-Minute Reset for ADHD Brains

When you have ADHD, the idea of "cleaning the house" can feel overwhelming. Your brain sees the entire mess as one giant, impossible task. But what if I told you that 15 minutes is all you need?

## The Magic of 15 Minutes

Fifteen minutes is short enough that your ADHD brain won't rebel, but long enough to make a real difference. Here's how it works:

### Step 1: Set a Timer
This is crucial. Set a timer for exactly 15 minutes. When it goes off, you stop. No exceptions.

### Step 2: Pick ONE Room
Don't try to clean the whole house. Pick the room that will make the biggest impact when guests walk in (usually the living room or kitchen).

### Step 3: The ADHD-Friendly Method
- **Gather** - Grab everything that doesn't belong in this room
- **Sort** - Make quick piles: trash, dishes, things that go elsewhere
- **Quick wins** - Focus on surfaces that make the biggest visual impact

## Why This Works for ADHD

1. **Time limit** prevents hyperfocus burnout
2. **Clear boundaries** reduce overwhelm
3. **Immediate results** give that dopamine hit we crave
4. **Low commitment** makes it easier to start

Remember: Done is better than perfect. Your house doesn't need to be Pinterest-worthy – it just needs to work for your family.`,
      published: true,
      categories: ['Household Systems & Organization', 'Neurodivergent-Friendly Living'],
      tags: ['ADHD', 'Cleaning', 'Organization', 'Routines'],
      metaTitle: 'The 15-Minute Reset for ADHD Brains',
      metaDescription: 'Quick cleaning system that works with ADHD, not against it. Perfect for overwhelmed parents.'
    },
    {
      id: 'teens-laundry-independence',
      slug: 'teens-laundry-independence',
      title: 'Teaching Teens to Do Their Own Laundry (Finally!)',
      date: new Date(Date.now() - 172800000).toISOString(),
      excerpt: 'Step-by-step guide to getting your teenager to actually do their own laundry without World War III.',
      content: `# Teaching Teens Laundry Independence

If you're still doing your teenager's laundry, this post is for you. It's time to teach them this essential life skill – and yes, it can be done without constant battles.

## Why Teens Resist Laundry

Let's be honest about why teens avoid laundry:
- It seems complicated
- They don't see the urgency (hello, smell-blind teenagers!)
- No one taught them the system
- They're afraid of messing up expensive clothes

## The Peaceful Transition Plan

### Week 1: Shadow Learning
Have them watch you do a load from start to finish. Explain each step out loud.

### Week 2: Guided Practice
They do it while you supervise and guide. Resist the urge to take over!

### Week 3: Solo Flight
They do their own laundry with you available for questions.

### Week 4+: Full Independence
Natural consequences take over. No clean clothes = figure it out.

## Essential Skills to Teach

1. **Sorting** - Dark, light, delicates (keep it simple!)
2. **Measuring detergent** - More isn't better
3. **Water temperature** - When hot vs. cold matters
4. **Timing** - Don't let wet clothes sit
5. **Folding basics** - Or at least not wadding everything up

## Pro Tips for Success

- Start with their favorite clothes so they're invested
- Create a simple reference card for the laundry room
- Let natural consequences do the teaching
- Celebrate their wins!

Remember: The goal isn't perfect laundry – it's independence. They'll figure out the details as they go.`,
      published: true,
      categories: ['Teen Parent Life'],
      tags: ['Teenagers', 'Independence Skills', 'Chores', 'Life Skills'],
      metaTitle: 'Teaching Teens Laundry Independence',
      metaDescription: 'Peaceful strategies for getting teenagers to manage their own laundry without constant battles.'
    }
  ]
}