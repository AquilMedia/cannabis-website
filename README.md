# Cannabis Project

Welcome to the Cannabis project! This is a Next.js application built with TypeScript, designed to provide information and services related to cannabis wellness.

## Project Structure

The project is organized as follows:

```
cannabis
├── public
│   └── assets
│       └── images
├── src
│   ├── components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Count.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SectionOne.tsx
│   │   ├── SectionTwo.tsx
│   │   └── SectionThree.tsx
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   ├── contact.tsx
│   │   ├── terms.tsx
│   │   ├── login.tsx
│   │   ├── about.tsx
│   │   ├── services.tsx
│   │   ├── faq.tsx
│   │   ├── blog.tsx
│   │   ├── pricing.tsx
│   │   ├── testimonials.tsx
│   │   ├── careers.tsx
│   │   ├── privacy.tsx
│   │   └── 404.tsx
│   ├── styles
│   │   ├── globals.css
│   │   └── bootstrap.min.css
│   └── utils
│       └── seo.ts
├── .env
├── next-env.d.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Header and Footer**: Common components for navigation and footer content.
- **Multiple Pages**: Includes home, contact, terms and conditions, and more.
- **Routing Structure**: Supports 10+ pages with a clear routing structure.
- **Count Functionality**: A component in the header to manage and display a count value.
- **Environment Variables**: Configuration for service URLs using an `.env` file.
- **SEO Tags**: Dynamic SEO tags provisioned for better search engine visibility.
- **Assets Folder**: Contains images used throughout the application.
- **Hero Section**: A prominent hero section on the homepage.
- **Additional Sections**: Three additional sections on the homepage for more content.
- **Bootstrap CSS**: Applied to all pages for responsive design.
- **404 Page**: Custom page for undefined routes.
- **Login Option**: A login feature in the header for user authentication.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd cannabis
npm install
```

Then, run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application in your browser.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.