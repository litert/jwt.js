import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@litert/jwt",
  description: "The JWT implementation for Node.JS.",
  base: '/projects/jwt.js/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guides/quick-start' },
      { text: 'FAQ', link: '/guides/faq' },
      { text: 'API Reference', link: '/api/' },
    ],

    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Quick Start', link: '/guides/quick-start' },
          { text: 'FAQ', link: '/guides/faq' },
        ]
      },
      {
        text: 'API Reference',
        items: typedocSidebar,
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/litert/jwt.js' }
    ]
  }
})
