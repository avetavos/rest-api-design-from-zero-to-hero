// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://software-design.avetavos.com',
  base: '/rest-api',
  output: 'static',
  integrations: [starlight({
      title: 'REST API Design — From Zero to Hero',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/rest-api/enhance.js' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/rest-api/manifest.webmanifest' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/rest-api/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/rest-api/icon-192.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0891B2' } },
        { tag: 'meta', attrs: { name: 'mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: "REST API Design" } },
        { tag: 'script', content: "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/rest-api/sw.js',{scope:'/rest-api/'}).catch(function(){})})}" },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/rest-api-design-from-zero-to-hero' }],
      sidebar: [
        { label: 'HTTP & REST Foundations', items: [{ autogenerate: { directory: 'http-and-rest' } }] },
        { label: 'Resource & URI Design', items: [{ autogenerate: { directory: 'resource-and-uri-design' } }] },
        { label: 'Methods, CRUD & Idempotency', items: [{ autogenerate: { directory: 'methods-crud-idempotency' } }] },
        { label: 'Status Codes & Errors', items: [{ autogenerate: { directory: 'status-and-errors' } }] },
        { label: 'Querying Collections', items: [{ autogenerate: { directory: 'collections-querying' } }] },
        { label: 'Versioning & Caching', items: [{ autogenerate: { directory: 'versioning-caching' } }] },
        { label: 'Security', items: [{ autogenerate: { directory: 'security' } }] },
        { label: 'Docs, Testing & Building', items: [{ autogenerate: { directory: 'docs-testing-building' } }] },
      ],
      }), preact()],
});