# Subject-Board Specific Routing Guide

## 🔗 Routing Architecture

### **URL Structure:**
```
/[subject]/boards     → Exam board selection page
/[subject]/[board]    → Subject + Board specific past papers
```

### **Example URLs:**
```
/chemistry/boards     → Choose exam board for Chemistry
/chemistry/aqa        → Chemistry AQA past papers
/biology/boards       → Choose exam board for Biology  
/biology/edexcel      → Biology Edexcel past papers
/physics/boards       → Choose exam board for Physics
/physics/ocr          → Physics OCR past papers
```

## 👤 Complete User Journey

### **Step 1: Homepage (`/`)**
- User sees subject grid/list
- Clicks on "Chemistry" subject card
- **Redirects to:** `/chemistry/boards`

### **Step 2: Exam Board Selection (`/chemistry/boards`)**
```
┌─────────────────────────────────────────────┐
│ Header                                      │
├─────────────────────────────────────────────┤
│ Hero: "Choose Your Exam Board"              │
│ • CHEMISTRY Past Papers (badge)             │
│ • Multiple Exam Boards (badge)             │
├─────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│ │   AQA   │ │ Edexcel │ │   OCR   │  Sidebar│
│ │  Logo   │ │  Logo   │ │  Logo   │    │    │
│ │ Pills   │ │ Pills   │ │ Pills   │    │    │
│ │[Button] │ │[Button] │ │[Button] │    │    │
│ └─────────┘ └─────────┘ └─────────┘         │
├─────────────────────────────────────────────┤
│ Footer                                      │
└─────────────────────────────────────────────┘
```

- User clicks "AQA" button
- **Redirects to:** `/chemistry/aqa`

### **Step 3: Final Past Papers Page (`/chemistry/aqa`)**
```
┌─────────────────────────────────────────────┐
│ Header                                      │
├─────────────────────────────────────────────┤
│ Hero: "Chemistry AQA Past Papers"           │
│ • AQA Exam Board (green badge)             │
│ • X AQA Papers Available (badge)           │
├─────────────────────────────────────────────┤
│ Papers Database (75%)      │ Sidebar (25%) │
│ ┌─────────────────────────┐ │               │
│ │ AQA Past Papers DB      │ │ Study Notes   │
│ │ • Year/Session filters  │ │ Ad Block      │
│ │ • 2024 Papers          │ │               │
│ │ • 2023 Papers          │ │ Practice Q    │
│ │ • Download links       │ │ Ad Block      │
│ └─────────────────────────┘ │               │
├─────────────────────────────────────────────┤
│ Footer                                      │
└─────────────────────────────────────────────┘
```

## 📂 File Implementation

### **1. Exam Board Selection Page**
**File:** `src/app/[subject]/boards/page.tsx`

```typescript
// Dynamic routing captures subject parameter
interface ExamBoardPageProps {
  params: Promise<{ subject: string }>;
}

// Button URLs generate clean routes
buttonUrl: `/${subject}/${board.title.toLowerCase().replace(/\s+/g, '-')}`
// Example: /chemistry/aqa
```

### **2. Subject-Board Specific Page**
**File:** `src/app/[subject]/[board]/page.tsx`

```typescript
// Captures both subject and board parameters
interface SubjectBoardPageProps {
  params: Promise<{ subject: string; board: string }>;
}

// Dynamic content based on both parameters
title: `${subject} ${board.toUpperCase()} Past Papers`
// Example: "Chemistry AQA Past Papers"
```

## 🎯 Key Benefits

### **1. SEO Optimized URLs**
```
❌ Bad:  /subjects/chemistry?board=aqa
✅ Good: /chemistry/aqa
```

### **2. Clean, Memorable URLs**
- `/chemistry/aqa` - Easy to remember and share
- `/biology/edexcel` - Clear hierarchy and purpose
- `/physics/ocr` - Bookmarkable and user-friendly

### **3. Better Analytics**
- Each subject-board combination has unique URL
- Easy to track popular exam boards per subject
- Clear conversion funnel tracking

### **4. Improved User Experience**
- Breadcrumb-friendly structure
- Logical navigation hierarchy
- Subject-specific branding throughout

## 🔄 Data Flow

### **Page Data Sources:**

```typescript
// Both pages use same Sanity data sources
const [subjectPageData, footerData] = await Promise.all([
  client.fetch(getSubjectPageQuery, { subjectId: subject }),
  client.fetch(getFooterQuery)
]);

// Different customization based on parameters
```

### **Content Customization:**

| Element | Exam Board Page | Subject-Board Page |
|---------|----------------|-------------------|
| Title | "Choose Your Exam Board" | "Chemistry AQA Past Papers" |
| Description | Generic selection text | Board-specific description |
| Badges | Subject + "Multiple Boards" | Board name + paper count |
| Papers | All exam boards shown | Filtered by board (future) |

## 🧪 Testing Guide

### **1. Test Route Generation**
```bash
# Test exam board page
curl -s http://localhost:3001/chemistry/boards | grep -q "Choose Your Exam Board"

# Test subject-board page  
curl -s http://localhost:3001/chemistry/aqa | grep -q "Chemistry AQA Past Papers"
```

### **2. Test User Journey**
1. **Start:** Go to `/chemistry/boards`
   - ✅ Page loads with exam board options
   - ✅ Each button has URL like `/chemistry/aqa`

2. **Click AQA:** Should redirect to `/chemistry/aqa`
   - ✅ URL is clean (no query parameters)
   - ✅ Title shows "Chemistry AQA Past Papers"
   - ✅ Green badge shows "AQA Exam Board"

3. **Test Multiple Subjects:**
   - `/biology/boards` → `/biology/edexcel`
   - `/physics/boards` → `/physics/ocr`

### **3. Test Parameter Handling**
```typescript
// Both subject and board are captured correctly
const { subject, board } = await params;
// subject = "chemistry", board = "aqa"
```

## 🚀 Deployment Considerations

### **1. URL Redirects (if needed)**
If you had old URLs, set up redirects:
```typescript
// In next.config.ts
redirects: [
  {
    source: '/subjects/:subject',
    destination: '/:subject/boards',
    permanent: true
  }
]
```

### **2. Sitemap Generation**
Generate dynamic sitemaps for all subject-board combinations:
```
/chemistry/boards
/chemistry/aqa
/chemistry/edexcel
/chemistry/ocr
/biology/boards
/biology/aqa
// ... etc
```

### **3. OpenGraph & Meta Tags**
Each URL gets unique meta tags:
```typescript
// /chemistry/aqa
title: "Chemistry AQA Past Papers"
description: "Download AQA Chemistry past papers, mark schemes, and examiner reports"
canonical: "https://yoursite.com/chemistry/aqa"
```

## 📊 Analytics Setup

### **Track User Journey:**
```javascript
// Page views
gtag('event', 'page_view', {
  page_title: 'Chemistry Exam Boards',
  page_location: '/chemistry/boards'
});

// Conversion
gtag('event', 'exam_board_selected', {
  subject: 'chemistry',
  board: 'aqa',
  page_location: '/chemistry/aqa'
});
```

### **Conversion Funnel:**
1. Homepage → Subject selection
2. `/chemistry/boards` → Exam board selection  
3. `/chemistry/aqa` → Past paper access
4. Paper download → Conversion

## 🔮 Future Enhancements

### **1. Subject-Board Filtering**
```typescript
// Filter papers by exam board when data available
const filteredPapers = papers.filter(paper => 
  paper.examBoard?.toLowerCase() === board.toLowerCase()
);
```

### **2. Breadcrumb Navigation**
```jsx
<Breadcrumbs>
  <Link href="/">Home</Link>
  <Link href={`/${subject}/boards`}>{subject}</Link>
  <span>{board.toUpperCase()}</span>
</Breadcrumbs>
```

### **3. Related Exam Boards**
```jsx
// Show other exam boards for same subject
<RelatedBoards subject={subject} currentBoard={board} />
```

---

## 🎯 Quick Start Checklist

- ✅ Create `/[subject]/boards/page.tsx` (exam board selection)
- ✅ Create `/[subject]/[board]/page.tsx` (final papers page)
- ✅ Update button URLs to use clean routing
- ✅ Test user journey from homepage to final page
- ✅ Verify URL parameters are captured correctly
- ✅ Check that titles and badges are dynamic

**Test URLs:**
- `/chemistry/boards` → Exam board selection
- `/chemistry/aqa` → Chemistry AQA papers
- `/biology/edexcel` → Biology Edexcel papers 