# Personal Website - Nico Masnovo

<div align="center">
  <img src="https://nicomasnovo.com/android-chrome-512x512.png" alt="Nico Masnovo Memoji" width="200" height="200" style="border-radius: 50%;">
</div>

<h3 align="center">Sr. Software Engineer Manager</h3>

<p align="center">Currently employed at <strong>BCI - MACHBANK</strong></p>
<p align="center">This repository contains the source code for my personal website built with Astro. The site serves as a professional portfolio and resource hub for engineering management and software development.</p>

## 🚀 Tech Stack for this project

### 🎨 Core Technologies

![Core](https://skillicons.dev/icons?i=astro,vue,js,ts,tailwind,threejs,npm)

### ☁️ Deployment & Infrastructure

![Infrastructure](https://skillicons.dev/icons?i=cloudflare,github,ghactions)

### ☁️ Others that I used while developing

![Infrastructure](https://skillicons.dev/icons?i=vscode,bash,git,nodejs,notion)

## 📑 Project Structure

```
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── icons/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── services/
├── public/
├── .wrangler/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── other config files...
```

## 📑 Content Sections

### Home Page

- Personal introduction
- Resume
- Latest Medium blog posts integration
- GitHub contributions visualization
- Social media links and professional contacts

### Resume

- Professional timeline in LinkedIn-style format
- Experience in software engineering and team leadership
- Key achievements and responsibilities

### Resources

- **Engineering & Management Books**: Curated reading list for professional development
- **Developer Resources**: Collection of useful tools and references for web and software engineers
- **CSS Helpers**: Work-in-progress collection of UI components including:
  - Gradient generators
  - Border radius tools
  - Other CSS utilities

## 🔧 Development

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Deploy with Wrangler:

It's hosted on Cloudflare Pages, so you can deploy it with Wrangler.
Make sure to update the `wrangler.toml` file with your own Cloudflare account details or configure on Cloudflare UI directly.

## 📝 Blog Integration

The website integrates with Medium through an automated GitHub Actions workflow that:

- Fetches latest posts from my Medium with a GH Action
- Updates a local JSON file with post metadata and content
- Downloads and processes post images into the appropriate asset folders

## TODO list of things I still need to improve:

- Better folder structure, right now componets folder is a mess.
- Add better documentation.
- Add more CSS cheatsheets

## 🤝 Connect with me

[![Website](https://img.shields.io/badge/Website-4A90E2?style=for-the-badge&logo=google-chrome&logoColor=white)](https://nicomasnovo.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nicolás-masnovo)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nicomasnovo)
[![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://blog.nicomasnovo.com)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nicomasnovo@gmail.com)

### Contact Details

- Website: [www.nicomasnovo.com](https://nicomasnovo.com)
- LinkedIn: [Nicolás Masnovo](https://linkedin.com/in/nicolás-masnovo)
- GitHub: [@nicomasnovo](https://github.com/nicomasnovo)
- Medium: [blog.nicomasnovo.com](https://blog.nicomasnovo.com)
- Email: [nicomasnovo@gmail.com](mailto:nicomasnovo@gmail.com)

## 📜 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - feel free to use it as inspiration for your own personal website.
