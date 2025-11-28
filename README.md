# Harsh Vishwakarma - Portfolio Website

A modern, animated portfolio website built with React, TypeScript, TailwindCSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Dark-themed, minimal aesthetic with glass/blur effects
- **Smooth Animations**: Page transitions and micro-interactions powered by Framer Motion
- **Responsive Layout**: Mobile-first design that works on all devices
- **Project Showcase**: Interactive project cards with detailed modals
- **Contact Form**: Integrated contact form with email fallback
- **Performance Optimized**: Built with Vite for fast development and production builds

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## 🚢 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite configuration
4. Click "Deploy"

The `vercel.json` file is already configured for optimal deployment.

## 📝 TODO

Before deploying, make sure to:

- [ ] **Upload Profile Image**: Replace `public/assets/profile.jpg` with your actual profile photo (recommended: 400x400px or larger square image)
- [ ] **Add Resume**: Place your resume PDF at `public/assets/resume.pdf` to enable the "Download Resume" button
- [ ] **Project Screenshots**: Add project images to `public/assets/projects/` directory:
  - `portfolio.png`
  - `blusdesk.png`
  - `notesnest.png`
  - `innerdecode.png`
  - `mediguardia.png`
- [ ] **Configure Contact Form**: Update the contact form in `src/components/ContactForm.tsx` to use your backend API endpoint (currently uses mailto fallback)
- [ ] **Environment Variables**: If using any APIs, add environment variables in Vercel dashboard

## 📁 Project Structure

```
portfolio2/
├── public/
│   └── assets/
│       ├── profile.jpg          # Profile image (to be added)
│       ├── resume.pdf           # Resume PDF (to be added)
│       └── projects/            # Project screenshots (to be added)
├── src/
│   ├── components/
│   │   ├── AnimatedPage.tsx     # Page transition wrapper
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer component
│   │   ├── Hero.tsx             # Hero section
│   │   ├── AboutCard.tsx        # About section card
│   │   ├── SkillsGrid.tsx       # Skills display grid
│   │   ├── ProjectCard.tsx      # Project card component
│   │   ├── ProjectModal.tsx     # Project detail modal
│   │   └── ContactForm.tsx     # Contact form
│   ├── pages/
│   │   ├── Home.tsx             # Home page
│   │   ├── About.tsx            # About page
│   │   ├── Projects.tsx         # Projects page
│   │   └── Contact.tsx          # Contact page
│   ├── data/
│   │   ├── siteData.ts          # Site content data
│   │   └── projects.ts          # Projects data
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── vercel.json                  # Vercel deployment config
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize colors:
- `background`: `#0d0d0d`
- `accent`: `#4f46e5`

### Content

Update content in:
- `src/data/siteData.ts` - Personal information, skills, contact details
- `src/data/projects.ts` - Project information

### Fonts

Fonts are loaded from Google Fonts in `index.html`. Currently using:
- Inter (primary)
- Poppins (fallback)

## 🔧 Development

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## 📄 License

This project is private and proprietary.

## 👤 Author

**Harsh Vishwakarma**
- Portfolio: [https://iykhrshuu.vercel.app/](https://iykhrshuu.vercel.app/)
- GitHub: [@meeharshu8685-dot](https://github.com/meeharshu8685-dot)
- LinkedIn: [Harsh Vishwakarma](https://www.linkedin.com/in/harsh-vishwakarma-20870b37b/)

---

Built with ❤️ using React, TypeScript, and Vite

