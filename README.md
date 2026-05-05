# Resume Portfolio Builder
## Overview

Transform your resume into a stunning, professional portfolio website in seconds. This web application automatically converts your resume (PDF, DOCX, or TXT) into a fully-functional, responsive portfolio website that you can download as a single HTML file.

## Features

- ** Multiple Format Support** - Upload resumes in PDF, DOCX, or TXT format
- ** Instant Portfolio Generation** - Automatically extract and organize resume content
- ** Fully Responsive Design** - Beautiful layouts that work on all devices
- ** Modern UI** - Clean, professional templates with Tailwind CSS
- ** Live Preview** - See your portfolio in real-time as you customize it
- ** Single-File Download** - Export your complete portfolio as a standalone HTML file
- ** Multiple Sections** - Automatically organizes: About, Skills, Experience, Projects, Education, and more
- ** Template Selection** - Choose from multiple professional design templates

## Tech Stack

- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Resume Parsing**: Custom PDF/DOCX/TXT parser

## How It Works

1. **Upload Your Resume** - Select and upload your resume file (PDF, DOCX, or TXT)
2. **AI-Powered Extraction** - The app parses your resume and extracts key information
3. **Choose a Template** - Select from available professional portfolio templates
4. **Customize & Preview** - View your portfolio in real-time and make adjustments
5. **Download** - Export your complete portfolio as a single HTML file

## Folder Structure

```
src/
├── components/          # Reusable React components
│   ├── FileUpload.tsx
│   ├── ResumeEditor.tsx
│   ├── TemplateSelector.tsx
│   ├── LivePreview.tsx
│   └── Navbar.tsx
├── pages/              # Page components
│   ├── LandingPage.tsx
│   └── Dashboard.tsx
├── context/            # React context for state management
│   └── ResumeContext.tsx
├── services/           # Business logic
│   ├── parserService.ts
│   └── templateService.ts
├── utils/              # Utility functions
│   └── fileUtils.ts
└── lib/
    └── utils.ts
```


## Future Improvements

- [ ] Multiple portfolio style templates
- [ ] Export as PDF option
- [ ] Integration with LinkedIn profile
- [ ] Theme customization (dark mode, color schemes)
- [ ] SEO optimization per portfolio
- [ ] Analytics dashboard
- [ ] Social media links integration



## Author

**Ritik Verma**  
