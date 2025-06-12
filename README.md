# Past Paper Collection Website

A comprehensive multi-curriculum past paper platform built with Next.js, TypeScript, and Tailwind CSS. This website provides students with access to examination resources from multiple international curricula including CIE A-Levels, IGCSE, IB, AP, and UK exam boards.

## Features

### 🌍 Multi-Curriculum Support
- **CIE A-Levels & IGCSE**: Complete Cambridge International collection
- **IB Diploma Programme**: Higher Level and Standard Level papers
- **Advanced Placement (AP)**: College Board examination resources
- **UK Exam Boards**: Edexcel, AQA, and OCR qualifications

### 📚 Subject Categories
- **Sciences**: Biology, Chemistry, Physics, Computer Science
- **Mathematics**: Pure Math, Statistics, Mechanics, Further Mathematics
- **Languages**: English Language and Literature
- **Humanities**: Economics, History, Geography

### 🔍 Advanced Filtering System
- Filter by curriculum (CIE, IB, AP, etc.)
- Filter by subject category
- Filter by year and examination session
- Filter by paper type (Theory, Practical, Mark Schemes)

### 📱 Modern Design
- Responsive design for all devices
- Modern UI with Tailwind CSS
- Smooth animations and transitions
- Accessible and user-friendly interface

## Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Animations**: Framer Motion
- **Development**: ESLint, PostCSS

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vickyliu927/past-paper-websites.git
cd past-paper-websites
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── subjects/          # Subject-specific pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── data/                  # Mock data and content
│   └── mockData.ts        # Subjects and papers data
├── types/                 # TypeScript interfaces
│   └── index.ts           # Type definitions
└── utils/                 # Utility functions
    └── cn.ts              # Class name utility
```

## Deployment

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and deploy

### Option 2: Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Option 3: GitHub Pages
1. Install GitHub Pages adapter
2. Configure next.config.js for static export
3. Deploy to GitHub Pages

## Features in Detail

### Homepage
- Hero section with multi-curriculum messaging
- Curriculum showcase (CIE, IB, AP, UK boards)
- Interactive subject filtering system
- Student testimonials
- Contact form
- FAQ section

### Subject Pages
- Detailed past paper listings
- Advanced filtering by year, curriculum, and type
- Download functionality for papers and mark schemes
- Subject-specific statistics
- Available curricula information

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Fast loading times

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, please contact us through the website's contact form or open an issue on GitHub.

---

Built with ❤️ for students worldwide seeking quality examination resources.
# Trigger Vercel redeployment
