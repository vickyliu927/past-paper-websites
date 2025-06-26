# Sanity Studio Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
All necessary dependencies have been installed:
- `@sanity/client` - Sanity client for data fetching
- `@sanity/vision` - Sanity Vision tool for querying data
- `sanity` - Sanity Studio core
- `next-sanity` - Next.js integration for Sanity

### 2. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_TOKEN=your-sanity-token

# Optional: For image handling
NEXT_PUBLIC_SANITY_IMAGE_URL=https://cdn.sanity.io
```

### 3. Create Sanity Project
1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Copy your project ID and replace `your-project-id` in:
   - `sanity.config.ts`
   - `lib/sanity.ts`
   - `.env.local`

### 4. Update Configuration Files
Replace `your-project-id` in these files:
- `sanity.config.ts` (line 8)
- `lib/sanity.ts` (line 4)

### 5. Run Sanity Studio
```bash
npm run studio
```
This will start Sanity Studio at `http://localhost:3333`

### 6. Access Studio
- **Development**: `http://localhost:3333`
- **Production**: `http://your-domain.com/studio`

## Content Types

The following content types have been set up:

### 1. Subject
- Title, slug, description
- Image with hotspot
- Associated exam boards and topics
- Order and active status

### 2. Exam Board
- Name, slug, description
- Logo image
- Website URL
- Active status

### 3. Topic
- Title, slug, description
- Associated subject
- Exam boards
- Order and active status

### 4. Past Paper
- Title, slug
- Subject, exam board, topic references
- Year, season, paper number
- Level (GCSE, A-Level, etc.)
- PDF files for paper and mark scheme
- Associated questions

### 5. Question
- Question number and content
- Associated past paper, subject, topic
- Marks available and difficulty level
- Images for question and solution
- Answer and explanation
- Tags for categorization

## Usage

### Adding Content
1. Start the studio: `npm run studio`
2. Navigate to the content type you want to add
3. Click "Create new [content type]"
4. Fill in the required fields
5. Save and publish

### Querying Data
Use the Sanity client in your Next.js components:

```typescript
import { client } from '@/lib/sanity';

// Example: Get all subjects
const subjects = await client.fetch(`
  *[_type == "subject" && isActive == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    "imageUrl": image.asset->url
  }
`);
```

### Image Handling
For image URLs, you'll need to install and configure `@sanity/image-url`:

```bash
npm install @sanity/image-url
```

Then update `lib/sanity.ts`:

```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
```

## Next Steps

1. Create your Sanity project and get your project ID
2. Update the configuration files with your project ID
3. Start adding content through the studio
4. Integrate the data into your Next.js components
5. Deploy your studio to production

## Troubleshooting

- **Studio not loading**: Check your project ID and dataset name
- **Images not showing**: Ensure you have the correct image URL configuration
- **Build errors**: Make sure all environment variables are set correctly 