# Exam Board Page Documentation

## Overview
This document describes the implementation of subject-specific exam board selection pages in the past paper website. Each subject (biology, chemistry, physics, etc.) can now have its own customized exam board page.

## Subject-Specific Pages
Each exam board page is now linked to a specific subject, allowing for:
- Subject-specific titles and descriptions
- Customized content per subject
- Better SEO and user experience
- Individual content management per subject

## Setting Up Subject-Specific Exam Board Pages

### Step 1: Create Exam Board Page Documents in Sanity

1. **Go to Sanity Studio** (http://localhost:3000/studio)
2. **Navigate to "Exam Board Page"** in the content list
3. **Create a new document** for each subject you want

### Step 2: Configure Each Page

For each subject, fill in these fields:

**Subject** (Required)
- Select the subject this page belongs to (e.g., Biology, Chemistry)
- This links the page to a specific subject

**Page Title** (Required)
- Example: "Choose Your Biology Exam Board"
- Example: "Select Your Chemistry Exam Board"
- Or keep generic: "Choose Your Exam Board"

**Page Description** (Required)
- Example: "Select your exam board to access relevant biology past papers and resources."
- Example: "Choose from available chemistry exam boards to find your specific curriculum."

**Page Active** (Required)
- Toggle to activate/deactivate this page
- Only active pages will be displayed

**Exam Boards Section** (Required)
- Reference to your existing exam boards section configuration
- This provides the list of available exam boards

### Step 3: Content Management Examples

**Biology Page Example:**
```
Subject: Biology
Title: "Choose Your Biology Exam Board"
Description: "Select your exam board to access comprehensive biology past papers, mark schemes, and study resources."
Page Active: ✓ True
Exam Boards Section: [Reference to your exam boards section]
```

**Chemistry Page Example:**
```
Subject: Chemistry  
Title: "Select Your Chemistry Exam Board"
Description: "Choose from available chemistry exam boards to access relevant past papers and examination resources."
Page Active: ✓ True
Exam Boards Section: [Reference to your exam boards section]
```

**Physics Page Example:**
```
Subject: Physics
Title: "Choose Your Physics Exam Board" 
Description: "Select your physics exam board to access topic-specific past papers and comprehensive study materials."
Page Active: ✓ True
Exam Boards Section: [Reference to your exam boards section]
```

## URL Structure

The URL structure remains the same:
- `/biology/boards` - Shows the biology-specific exam board page
- `/chemistry/boards` - Shows the chemistry-specific exam board page
- `/physics/boards` - Shows the physics-specific exam board page

## Technical Implementation

### Schema Changes
- **Added `subject` field**: Links each exam board page to a specific subject
- **Updated preview**: Shows "Subject - Title" format in Sanity interface
- **Required validation**: Ensures every page is linked to a subject

### Query Updates
- **Subject filtering**: Only returns the exam board page for the specific subject
- **Subject data**: Includes subject information in the response
- **Parameter passing**: Uses `subjectSlug` parameter to filter results

### Page Component
- **Subject-specific fetching**: Passes subject parameter to query
- **404 handling**: Shows 404 if no active page exists for that subject
- **Dynamic content**: Uses subject-specific titles and descriptions

## Benefits

1. **Customization**: Each subject can have tailored content
2. **SEO**: Subject-specific titles improve search engine optimization
3. **User Experience**: More relevant and targeted content per subject
4. **Content Management**: Easy to manage different messaging per subject
5. **Scalability**: Easy to add new subjects with their own pages

## File Structure

```
schemas/
└── examBoardPage.ts          # Updated schema with subject reference

lib/
└── queries.ts                # Updated query with subject filtering

src/app/[subject]/boards/
└── page.tsx                  # Updated to use subject-specific data
```

## Managing Content

### To Create a New Subject's Exam Board Page:
1. Ensure the subject exists in your "Subject" content type
2. Create a new "Exam Board Page" document
3. Link it to the subject
4. Customize the title and description
5. Set as active
6. The page will automatically be available at `/[subject-slug]/boards`

### To Deactivate a Subject's Page:
1. Find the exam board page for that subject
2. Toggle "Page Active" to false
3. The page will show 404 until reactivated

### To Update Content:
1. Edit the specific subject's exam board page document
2. Changes appear immediately on the website
3. Each subject's page is managed independently

This system provides maximum flexibility while maintaining a clean, organized content structure.

# Exam Board Page Implementation Guide

## Overview

This documentation explains the implementation of a standalone exam board selection page that acts as an intermediary between subject selection and the final past papers database. Users are now directed through a subject-specific exam board page before accessing past papers.

## User Flow

```
Homepage Subject Selection → /[subject]/boards → /subjects/[id]?board=[exam-board]
```

**Example:**
1. User clicks "Chemistry" on homepage
2. Redirected to `/chemistry/boards`
3. User selects "AQA" exam board
4. Redirected to `/subjects/chemistry?board=aqa`
5. Subject page shows AQA-specific content with green badge

## Architecture

### File Structure

```
src/app/
├── [subject]/
│   └── boards/
│       └── page.tsx          # Dynamic exam board page
├── subjects/
│   └── [id]/
│       ├── page.tsx          # Updated to handle board parameter
│       └── SubjectPageClient.tsx  # Updated with board display
└── components/
    └── ExamBoardsSection.tsx # Reused component

schemas/
├── examBoardPage.ts          # New schema for page configuration
├── examBoardsSection.ts      # Existing exam boards data
└── index.ts                  # Updated schema exports

lib/
└── queries.ts               # New query for exam board page data
```

## Implementation Details

### 1. Sanity Schema (`schemas/examBoardPage.ts`)

```typescript
{
  name: 'examBoardPage',
  title: 'Exam Board Page',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'isActive', type: 'boolean' },        // Toggle page on/off
    { name: 'examBoardsSection', type: 'reference' } // References existing exam boards
  ]
}
```

**Key Features:**
- ✅ **Single Document Management**: One document controls all subject exam board pages
- ✅ **IsActive Toggle**: Can enable/disable the entire page functionality
- ✅ **Content Reuse**: References existing exam boards section for consistency

### 2. Dynamic URL Generation

The exam board page dynamically modifies button URLs based on the subject parameter:

```typescript
// In /[subject]/boards/page.tsx
examBoards: examBoardPageData.examBoardsSection.examBoards.map((board: any) => ({
  ...board,
  buttonUrl: `/subjects/${subject}?board=${encodeURIComponent(board.title.toLowerCase().replace(/\s+/g, '-'))}`
}))
```

**URL Pattern:**
- Input: `board.title = "AQA"`
- Output: `/subjects/chemistry?board=aqa`

### 3. Subject Page Integration

The subject page now accepts and displays the selected exam board:

```typescript
// Accepts searchParams for board parameter
interface SubjectPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ board?: string }>;
}

// Displays green badge when board is selected
{selectedBoard && (
  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-sm font-medium text-green-800">
    {selectedBoard.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Exam Board
  </span>
)}
```

## Page Layout

### Exam Board Page (`/[subject]/boards`)

```
┌─────────────────────────────────────────────┐
│ Header                                      │
├─────────────────────────────────────────────┤
│ Hero Section                                │
│ • Subject-specific title                    │
│ • Dynamic badge: "[SUBJECT] Past Papers"    │
│ • Multiple Exam Boards badge               │
├─────────────────────────────────────────────┤
│ Main Content (75%)        │ Sidebar (25%)   │
│ ┌─────────────────────────┐ │ ┌─────────────┐ │
│ │ Exam Boards Grid        │ │ │ Study Notes │ │
│ │ • Each board = Card     │ │ │ Ad Block    │ │
│ │ • Dynamic button URLs  │ │ │             │ │
│ │ • Subject-specific     │ │ ├─────────────┤ │
│ └─────────────────────────┘ │ │ Practice Q  │ │
│                             │ │ Ad Block    │ │
│                             │ └─────────────┘ │
├─────────────────────────────────────────────┤
│ Footer                                      │
└─────────────────────────────────────────────┘
```

## Configuration Steps

### 1. Sanity Studio Setup

1. **Navigate to Sanity Studio:** `http://localhost:3333`
2. **Create Exam Board Page Document:**
   - Title: `"Choose Your Exam Board"`
   - Description: `"Select your exam board to access relevant past papers and resources for this subject."`
   - Page Active: `✅ TRUE`
   - Exam Boards Section: `→ Reference existing exam boards section`

3. **Verify Exam Boards Section Exists:**
   - Must have exam boards configured with titles, descriptions, images
   - Each board needs title, description, buttonText, buttonUrl, pills

### 2. Content Management

**Single Source of Truth:**
- ✅ One exam board page document controls all subjects
- ✅ One exam boards section provides data for all pages
- ✅ IsActive toggle can disable entire functionality
- ✅ Changes apply to all subject exam board pages instantly

## Testing Guide

### 1. Basic Functionality Test

```bash
# Test exam board page loads
curl -s http://localhost:3001/chemistry/boards | grep -q "Choose Your Exam Board"

# Test different subjects work
curl -s http://localhost:3001/physics/boards | grep -q "PHYSICS Past Papers"
curl -s http://localhost:3001/biology/boards | grep -q "BIOLOGY Past Papers"
```

### 2. User Journey Test

1. **Access exam board page:** `http://localhost:3001/chemistry/boards`
   - ✅ Page loads with header, hero, exam boards, sidebar, footer
   - ✅ Hero shows "CHEMISTRY Past Papers" badge
   - ✅ Exam boards display in grid layout

2. **Click exam board button:** Click any exam board (e.g., "AQA")
   - ✅ Redirects to: `/subjects/chemistry?board=aqa`
   - ✅ Subject page loads with green "Aqa Exam Board" badge
   - ✅ URL contains board parameter

3. **Test multiple subjects:**
   - ✅ `/physics/boards` → `/subjects/physics?board=ocr`
   - ✅ `/biology/boards` → `/subjects/biology?board=edexcel`

### 3. Edge Cases

```bash
# Test invalid subjects (should still work with fallback)
http://localhost:3001/invalid-subject/boards

# Test page disabled (should return 404)
# Set isActive = false in Sanity, then test any /[subject]/boards URL
```

## Development Logs

Based on terminal output, the implementation is working correctly:

```
✓ Compiled /[subject]/boards in 6.3s (5008 modules)
GET /chemistry/boards 200 in 8755ms           # ✅ Exam board page loads
GET /subjects/chemistry?board=aqa 200 in 2468ms # ✅ Subject page with board parameter
GET /chemistry/boards 200 in 137ms            # ✅ Subsequent loads are fast
```

## Benefits

### 1. **Improved User Experience**
- Clear separation between subject and exam board selection
- Subject-specific branding and messaging
- Visual confirmation of selected exam board

### 2. **Content Management**
- Single document controls all exam board pages
- Easy to activate/deactivate entire functionality
- Reuses existing exam board data for consistency

### 3. **SEO & Analytics**
- Dedicated URLs for each subject's exam board selection
- Clear user journey tracking possible
- Subject-specific content optimization

### 4. **Scalability**
- Easy to add new subjects (just update URLs)
- No additional Sanity documents needed per subject
- Consistent behavior across all subjects

## Future Enhancements

### Potential Improvements:
1. **Subject-Specific Exam Boards**: Filter exam boards by subject relevance
2. **Analytics Integration**: Track which exam boards are most popular per subject
3. **Breadcrumb Navigation**: Add breadcrumbs showing user's path
4. **Default Exam Board**: Remember user's previous selection
5. **Exam Board Descriptions**: Subject-specific descriptions for each exam board

---

## Quick Reference

**Key URLs:**
- Exam Board Page: `/[subject]/boards`
- Subject Page: `/subjects/[id]?board=[exam-board]`
- Sanity Studio: `http://localhost:3333`

**Key Files:**
- Page: `src/app/[subject]/boards/page.tsx`
- Schema: `schemas/examBoardPage.ts`
- Query: `lib/queries.ts` → `getExamBoardPageQuery`

**Configuration:**
- Sanity: Create "Exam Board Page" document with isActive = true
- Reference existing "Exam Boards Section" document
- No per-subject configuration needed 