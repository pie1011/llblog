# Laughs and Laundry Blog Documentation

## Project Overview
A Next.js blog application built with Prisma ORM and PostgreSQL, featuring a modern tech stack and serverless architecture.

### Tech Stack
- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Deployment**: Netlify-ready

## Project Structure
```
├── app/                      # Next.js app directory (App Router)
│   ├── api/                  # API routes
│   │   └── posts/           # Posts API endpoints
│   ├── posts/               # Post-related pages
│   │   ├── [id]/           # Individual post view
│   │   └── new/            # New post creation
│   ├── users/              # User-related pages
│   │   └── new/           # New user creation
│   ├── Header.tsx         # Main header component
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/                    # Utility functions
│   └── prisma.ts          # Prisma client configuration
├── prisma/                # Database configuration
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Database seeding script
│   └── migrations/        # Database migrations
```

## Database Schema

### User Model
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

### Post Model
```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int?
  author    User?    @relation(fields: [authorId], references: [id])
}
```

## Key Features
1. **Blog Posts Management**
   - Create, read, update, and delete posts
   - Post publishing status control
   - Author attribution

2. **User Management**
   - User creation and management
   - Email uniqueness validation
   - Relationship with posts

3. **API Routes**
   - RESTful API endpoints for posts
   - Server-side data handling

4. **Modern UI Features**
   - Responsive grid layout
   - Tailwind CSS styling
   - Server-side rendering

## Environment Configuration
Required environment variables:
```
DATABASE_URL="your_prisma_postgres_connection_string"
```

## Common Operations

### Database Management
```bash
# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Seed database
npx prisma db seed
```

### Development
```bash
# Start development server
npm run dev

# Build application
npm run build

# Start production server
npm start
```

## Future Enhancement Areas
1. Authentication system
2. Comments functionality
3. Categories and tags for posts
4. Image upload capability
5. Search functionality
6. Admin dashboard
7. RSS feed
8. Social sharing features

## Deployment
The application is configured for deployment on Netlify with:
- Automatic deployments from Git
- Environment variable management
- Serverless functions support
- Database connection through Prisma

## Useful Links
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
