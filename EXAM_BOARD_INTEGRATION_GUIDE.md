# Exam Board Integration Guide 📚

## Overview

The Subject Page document now includes an **Exam Board** field, enabling precise filtering of past papers by both subject AND exam board. This creates a more granular content management system where each subject page can be tailored to specific exam boards.

## 🔧 **Schema Changes Made**

### 1. **Subject Page Schema** (`schemas/subjectPage.ts`)
- ✅ Added `examBoard` reference field (required)
- ✅ Updated preview to show exam board name
- ✅ Added validation to ensure exam board is selected

### 2. **Queries Updated** (`lib/queries.ts`)
- ✅ `getSubjectPageQuery` - Now includes exam board data
- ✅ `getSubjectPageByExamBoardQuery` - New query for subject + exam board filtering

### 3. **TypeScript Types** (`src/types/index.ts`)
- ✅ `SubjectPageData` interface updated with exam board field

## 📊 **Data Structure**

### **Subject Page Document**
```typescript
interface SubjectPageData {
  subjectId: string;           // e.g., "chemistry"
  examBoard: {                 // NEW: Required field
    name: string;              // e.g., "AQA"
    slug: { current: string }; // e.g., "aqa"
    description?: string;
  };
  title: string;               // e.g., "Chemistry AQA Past Papers"
  // ... other existing fields
}
```

### **Past Paper Document** (Already Existing)
```typescript
interface PastPaper {
  subject: Reference;    // Links to subject
  examBoard: Reference;  // Links to exam board ✅ Already exists!
  topic?: Reference;     // Optional topic reference
  // ... other fields
}
```

## 🚀 **Implementation Strategy**

### **Phase 1: Current Setup (Recommended)**
Each subject gets **multiple Subject Page documents** - one per exam board:

```
📄 Subject Pages in Sanity:
├── Chemistry AQA (subjectId: "chemistry", examBoard: "aqa")
├── Chemistry CIE (subjectId: "chemistry", examBoard: "cie") 
├── Chemistry Edexcel (subjectId: "chemistry", examBoard: "edexcel")
├── Biology AQA (subjectId: "biology", examBoard: "aqa")
├── Biology CIE (subjectId: "biology", examBoard: "cie")
└── ... etc
```

### **Phase 2: URL Structure**
```
🌐 URL Patterns:
├── /chemistry                 → Exam board selection page
├── /chemistry/aqa             → Chemistry AQA-specific page
├── /chemistry/cie             → Chemistry CIE-specific page
├── /biology/aqa               → Biology AQA-specific page
└── /subjects/chemistry?board=aqa → Legacy URL (still works)
```

## 🔍 **Query Examples**

### **Get Subject Page by Subject Only**
```typescript
// Returns first matching subject page (any exam board)
const data = await client.fetch(getSubjectPageQuery, { 
  subjectId: "chemistry" 
});
```

### **Get Subject Page by Subject + Exam Board**
```typescript
// Returns specific subject + exam board combination
const data = await client.fetch(getSubjectPageByExamBoardQuery, { 
  subjectId: "chemistry",
  examBoardSlug: "aqa"
});
```

### **Filter Past Papers by Subject + Exam Board**
```typescript
// Past papers already support this filtering via existing schema
const papers = await client.fetch(`
  *[_type == "pastPaper" && 
    subject->slug.current == $subjectSlug && 
    examBoard->slug.current == $examBoardSlug
  ]
`, {
  subjectSlug: "chemistry",
  examBoardSlug: "aqa"
});
```

## 📝 **Sanity Studio Setup**

### **Step 1: Create Exam Boards**
1. Go to **Sanity Studio** → **Exam Board**
2. Create exam boards: AQA, CIE, Edexcel, etc.
3. Ensure each has a proper slug (auto-generated from name)

### **Step 2: Create Subject Pages**
1. Go to **Sanity Studio** → **Subject Page**
2. For each subject + exam board combination:
   - **Subject ID**: `chemistry` (matches homepage subject)
   - **Exam Board**: Select from dropdown (e.g., AQA)
   - **Title**: `Chemistry AQA Past Papers`
   - **Description**: Exam board-specific description
   - Configure other sections as needed

### **Step 3: Link Past Papers**
1. Go to **Sanity Studio** → **Past Paper**
2. For each past paper:
   - **Subject**: Select subject (e.g., Chemistry)
   - **Exam Board**: Select exam board (e.g., AQA)
   - **Topic**: Optional topic categorization
   - Upload files and configure metadata

## 🎯 **Content Strategy**

### **Option A: Exam Board-Specific Content**
- Each subject page tailored to specific exam board
- Different past papers, tutorials, and resources per board
- More targeted user experience

**Example:**
```
Chemistry AQA Page:
- AQA-specific past papers
- AQA curriculum guidance
- AQA-style practice questions

Chemistry CIE Page:
- CIE-specific past papers  
- CIE curriculum differences
- CIE examination format tips
```

### **Option B: Shared Content with Board Filtering**
- Single subject page with exam board filtering
- Same core content, filtered past papers
- Simpler content management

## 🔄 **Migration from Current Setup**

### **Current State**
- Subject pages exist without exam board association
- Past papers may not be properly linked to exam boards

### **Migration Steps**
1. **Audit existing data** - Check which past papers need exam board linking
2. **Create exam board documents** - Set up all exam boards used
3. **Update subject pages** - Add exam board field to existing pages
4. **Link past papers** - Ensure all past papers reference correct exam boards
5. **Test filtering** - Verify subject + exam board queries work correctly

## 💡 **Benefits of This Setup**

### **For Content Managers**
- ✅ Precise control over content per exam board
- ✅ Easy to add new exam boards
- ✅ Clear organization in Sanity Studio
- ✅ Flexible content strategy options

### **For Users**
- ✅ Relevant content only (no wrong exam board papers)
- ✅ Better user experience with targeted content
- ✅ Faster page loads (filtered data)
- ✅ SEO-friendly URLs (`/chemistry/aqa`)

### **For Developers**
- ✅ Type-safe exam board data
- ✅ Flexible querying options
- ✅ Clear data relationships
- ✅ Future-proof architecture

## 🚨 **Important Notes**

### **Required Actions**
1. **Update existing Subject Pages** - Add exam board field to all existing documents
2. **Create exam board combinations** - Set up one subject page per exam board
3. **Link past papers** - Ensure past papers reference correct exam boards

### **Studio Interface**
- Subject pages now show: `"Chemistry AQA | chemistry | AQA"`
- Past papers already support exam board linking
- Clear visual identification of exam board associations

## 🔮 **Future Enhancements**

### **Planned Features**
- 📊 Exam board-specific analytics
- 🎯 Targeted advertising per exam board
- 📚 Board-specific study resources
- 🤖 AI-powered content recommendations

### **Schema Extensibility**
- Easy to add exam board-specific fields
- Support for regional curriculum differences
- Integration with external exam board APIs
- Advanced filtering and search capabilities

---

## 🎉 **Ready to Use!**

The exam board integration is now complete and ready for content creation. Start by setting up your exam boards in Sanity Studio, then create subject page documents for each subject + exam board combination you want to support.

**Next Steps:**
1. Set up exam boards in Sanity Studio
2. Create subject page documents for each combination
3. Link existing past papers to appropriate exam boards
4. Test the new filtering functionality
5. Update your content strategy to leverage exam board-specific targeting 