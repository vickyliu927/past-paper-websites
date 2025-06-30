# Past Paper File Upload Guide

## Overview
You can now upload past paper files (PDFs) directly to Sanity instead of just entering external URLs. This gives you more control over your files and ensures they're always available.

## How to Upload Files

### Step 1: Access Past Papers
1. **Go to Sanity Studio** (http://localhost:3000/studio)
2. **Navigate to "Subject Page"** in your content list
3. **Select the subject page** you want to edit
4. **Scroll to "Past Papers"** section
5. **Click on an existing paper** or **add a new past paper**

### Step 2: Upload Files
For each past paper, you now have two options for each file type:

#### Option A: Upload File Directly (Recommended)
- **Question Paper File**: Click "Upload" and select your PDF
- **Mark Scheme File**: Click "Upload" and select your PDF (optional)

#### Option B: Use External URL (Alternative)
- **Question Paper URL (Alternative)**: Enter external URL if not uploading
- **Mark Scheme URL (Alternative)**: Enter external URL if not uploading

### Step 3: File Priority
**Important**: If you upload a file AND enter a URL, the **uploaded file takes priority**. The system will use:
1. **Uploaded file** (if available)
2. **External URL** (if no file uploaded)

## Benefits of File Upload

### ✅ Advantages
- **Always Available**: Files hosted on Sanity CDN
- **Faster Loading**: Optimized delivery
- **Better Control**: Manage all content in one place
- **No Broken Links**: Files won't disappear from external sources
- **SEO Friendly**: Better for search engine indexing

### ⚠️ Considerations
- **Storage Costs**: Uses your Sanity storage quota
- **Upload Time**: Large files may take time to upload
- **File Management**: Need to manage files within Sanity

## Technical Implementation
The system automatically prioritizes uploaded files over external URLs, giving you flexibility while ensuring the best user experience.
